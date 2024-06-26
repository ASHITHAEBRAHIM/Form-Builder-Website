import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formId = parseInt(params.id);
        const form = await prisma.form.findUnique({
            where: { id: formId },
            include: {
                questions: {
                    include: {
                        options: true 
                    }
                }
            }
        });

        if (!form) {
            return NextResponse.json({ error: "Form not found" }, { status: 404 });
        }

        return NextResponse.json(form);
    } catch (error) {
        console.error("Error fetching form:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

