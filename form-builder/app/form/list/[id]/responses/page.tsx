'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '@/app/_components/layout/Sidebar';
import ResponseAction from './ResponseAction';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

const ResponsePage = ({ formId }: { formId: string | number }) => {
    const [responses, setResponses] = useState<any[]>([]);
    const [formName, setFormName] = useState<string>('');
    const [questions, setQuestions] = useState<string[]>([]);

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const id = pathParts[pathParts.length - 2];

        const fetchResponses = async (id: string) => {
            try {
                const response = await axios.get(`/api/form/${id}/responses`);
                setResponses(response.data.responses);
                setFormName(response.data.responses[0]?.submission?.form?.formName);
                const allQuestions = response.data.responses.map((response: any) => response.question.question);
                
                const uniqueQuestions = Array.from(new Set(allQuestions)) as string[];
                setQuestions(uniqueQuestions);
            } catch (error) {
                console.error('Error fetching responses:', error);
            }
        };

        fetchResponses(id);
    }, []); 

    const groupedResponses: { [key: string]: any } = {};
    responses.forEach((response: any) => {
        const submissionId = response.submissionId;
        if (!groupedResponses[submissionId]) {
            groupedResponses[submissionId] = {
                firstName: response.submission.firstName,
                lastName: response.submission.lastName,
                answers: {},
            };
        }
        groupedResponses[submissionId].answers[response.question.question] = response.answer;
    });

    return (
        <div className="flex">
        <Sidebar />
        <div className="w-full p-4">
            <ResponseAction formName={formName} />

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            <TableCell>Firstname</TableCell>
                            <TableCell>Lastname</TableCell>
                            {questions.map((question, index) => (
                                <TableCell key={index}>{question}</TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.keys(groupedResponses).map((submissionId, index) => (
                            <TableRow key={index} className="border-b border-gray-200">
                                <TableCell>{groupedResponses[submissionId].firstName}</TableCell>
                                <TableCell>{groupedResponses[submissionId].lastName}</TableCell>
                                {questions.map((question, qIndex) => (
                                    <TableCell key={qIndex}>
                                        {groupedResponses[submissionId].answers[question] || '-'}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {Object.keys(groupedResponses).length === 0 && (
                            <TableRow>
                                <TableCell colSpan={questions.length + 2} className="text-center py-2">No responses available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
);
};

export default ResponsePage;
