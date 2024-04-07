'use client'
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface Form {
  id: string;
  formName: string;
  createdDate: string;
  responseCount: number;
}

const FormTable = () => {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('/api/form');
        const formsWithResponseCount = await Promise.all(
          response.data.map(async (form: Form) => {
            const responseCountResponse = await axios.get(`/api/form/${form.id}/responses`);
            const responseCount = responseCountResponse.data.responseCount;
            return { ...form, responseCount };
          })
        );
        setForms(formsWithResponseCount);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (formId: string | number) => {
    try {
      await axios.delete(`/api/submitForm/${formId}`);
      setForms(forms.filter((form) => form.id !== formId));
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  return (
    <div className='mx-8 justify-between'>
    <Table className="w-full border-collapse">
      <TableHeader className="bg-gray-200">
        <TableRow>
          <TableCell className="px-4 py-2">Form Name</TableCell>
          <TableCell className="px-4 py-2">Last Updated</TableCell>
          <TableCell className="px-4 py-2">Responses</TableCell>
          <TableCell className="px-4 py-2">Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {forms.length > 0 ? (
          forms.map((form) => (
            <TableRow key={form.id} className="border-b">
              <TableCell className="px-4 py-2">
                <Link href={`/form/list/${form.id}/responses`}>
                  {form.formName}
                </Link>
              </TableCell>
              <TableCell className="px-4 py-2">{form.createdDate}</TableCell>
              <TableCell className="px-4 py-2">{form.responseCount}</TableCell>
              <TableCell className="px-4 py-2">
                <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(form.id)} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="px-4 py-2">No forms available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);
};
export default FormTable;
