import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const formId = parseInt(params.id);
    try {
        const responses = await prisma.response.findMany({
            where: {
                submission: {
                    formId: formId
                }
            },
            include: {
                question: true, 
                submission: {
                    select: {
                        firstName: true,
                        lastName: true,
                        form: { 
                            select: {
                                formName: true 
                            }
                        }
                    }
                }
            }
        });

        const uniqueSubmissionIds = new Set(responses.map(response => response.submissionId));
        const responseCount = uniqueSubmissionIds.size;
        return NextResponse.json({responses, responseCount});
        
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

