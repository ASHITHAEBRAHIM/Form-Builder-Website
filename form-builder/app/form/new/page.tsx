'use client'

import Sidebar from '@/app/_components/layout/Sidebar';
import { useState } from 'react';
import { ProfileForm } from './MyForm';
import NewFormAction from './NewFormAction';
import { FormData, FormQuestion } from './type';


const NewForm = () => {
  const [formData, setFormData] = useState<FormData>({
    formName: "Untitled Form",
    selectedFields: [],
    questions: [],
  });
  const [questions, setQuestions] = useState<FormQuestion[]>([]); 

  const handleFormUpdate = (data: FormData, questions: FormQuestion[]) => {
    setFormData(data);
    setQuestions(questions);
  };
  
  return (
    <div className="flex flex-col  mx-auto">
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <Sidebar/>
        <div className="flex flex-col">
          <NewFormAction formData={formData} questions={questions} /> 
          <ProfileForm onFormUpdate={handleFormUpdate} />
        </div>
      </div>
    </div>
  );
};


export default NewForm;
