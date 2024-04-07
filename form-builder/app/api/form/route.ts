import { formSchema, questionSchema, questionWithOptionsSchema } from "@/lib/validations/form";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    
    const formValidation = formSchema.safeParse(body);
    if (!formValidation.success)
        return NextResponse.json(formValidation.error.format(), { status: 400 });

    try {
        const { formName, questions } = body;
        
        if (questions) {
            const questionsValidation = questionSchema.array().safeParse(questions);
            if (!questionsValidation.success)
                return NextResponse.json(questionsValidation.error.format(), { status: 400 });

            const questionsWithOptions = questions.filter((question: any) => question.type === 'Radio' || question.type === 'Checkbox');
            const questionsWithOptionsValidation = questionWithOptionsSchema.array().safeParse(questionsWithOptions);
            if (!questionsWithOptionsValidation.success)
                return NextResponse.json(questionsWithOptionsValidation.error.format(), { status: 400 });
        }
        
        const newForm = await prisma.form.create({
            data: {
                formName,
                questions: {
                    create: questions ? questions.map((question: any) => {
                        return {
                            question: question.question,
                            type: question.type,
                            options: question.options ? { createMany: { data: question.options.map((option: string) => ({ value: option })) } } : undefined
                        };
                    }) : []
                }
            },
            include: {
                questions: true 
            }
        });

        return NextResponse.json({ message: 'Form submitted successfully', data: newForm });
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
        const form = await prisma.form.findMany();
        return NextResponse.json(form);
}