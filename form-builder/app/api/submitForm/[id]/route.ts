import { submissionSchema } from "@/lib/validations/form";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    
    const submissionValidation = submissionSchema.safeParse(body);
    if (!submissionValidation.success) {
        return NextResponse.json(submissionValidation.error.format(), { status: 400 });
    }

    try {
        const { firstName, lastName, responses } = body;
        const formId = parseInt(params.id, 10);

        const form = await prisma.form.findUnique({
            where: { id: formId },
            include: { questions: true },
        });

        if (!form) {
            return NextResponse.json({ error: "Form not found" }, { status: 404 });
        }

        const newSubmission = await prisma.submission.create({
            data: {
                formId: form.id,
                firstName,
                lastName,
            },
        });

        if (Array.isArray(responses) && responses.length > 0) {
            await Promise.all(responses.map(async (response: any) => {
                const { questionId, answer } = response;
                await prisma.response.create({
                    data: {
                        submissionId: newSubmission.id,
                        questionId,
                        answer: Array.isArray(answer) ? answer.join(', ') : answer,
                    },
                });
            }));
        }

        const newSubmissionWithAnswers = await prisma.submission.findUnique({
            where: { id: newSubmission.id },
            include: { responses: true },
        });

        return NextResponse.json({ message: 'Form submitted successfully', data: newSubmissionWithAnswers });
    } catch (error) {
        console.error('Error submitting form:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const formId = parseInt(params.id);

    try {
        const form = await prisma.form.findUnique({
            where: { id: formId },
            include: {
                questions: {
                    include: {
                        options: true,
                    }
                },
                submissions: {
                    include: {
                        responses: true
                    }
                }
            }
        });

        if (!form) {
            return NextResponse.json({ error: "Form not found" }, { status: 404 });
        }

        await prisma.response.deleteMany({
            where: { submission: { formId: formId } }
        });

        await prisma.submission.deleteMany({
            where: { formId: formId }
        });

        await Promise.all(
            form.questions.map(async (question) => {
                try {
                    await prisma.option.deleteMany({
                        where: { questionId: question.id }
                    });

                    await prisma.question.delete({ where: { id: question.id } });
                } catch (error) {
                    console.error("Error deleting question and its options:", error);
                    throw error; 
                }
            })
        );

        await prisma.form.delete({ where: { id: formId } });

        console.log("Form and associated data deleted successfully");
        return NextResponse.json({ message: "Form and associated data deleted successfully" });
    } catch (error) {
        console.error("Error deleting form and associated data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}