"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Checkbox } from "@/components/ui/checkbox"
import { formSchema } from "@/lib/validations/form"
import AddNewField from "./AddNewField"
import { FormData, FormQuestion } from "./type"

interface ProfileFormProps {
  onFormUpdate: (data: FormData, questions: FormQuestion[]) => void;
}

export function ProfileForm({ onFormUpdate }:ProfileFormProps) {
  const [formName, setFormName] = useState("Untitled Form");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [questions, setQuestions] = useState<FormQuestion[]>([]);
  const [question, setQuestion] = useState("");
  
  const handleRadioOptionChange = (questionIndex: number, optionIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex] && newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options[optionIndex] = event.target.value;
      setQuestions(newQuestions);
      updateFormData();
    }
  };
  
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    updateFormData();
  }, [formName, selectedFields, questions]);

  const updateFormData = () => {
    onFormUpdate({
      formName,
      selectedFields,
      questions,
    }, questions); 
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex] && newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options[optionIndex] = event.target.value;
      setQuestions(newQuestions);
      updateFormData();
    }
  };
  
  const handleAddOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex] && newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options.push('');
      setQuestions(newQuestions);
      updateFormData();
    }
  };

  function handleAddField(selectedField: string | null) {
    setSelectedFields(prevFields => [...prevFields, selectedField || '']); 

    let newQuestion: FormQuestion = { question, type: selectedField || '', options: [] };

    if (selectedField === 'Checkbox') {
      newQuestion.options = [];
    }
    if (selectedField === 'Radio') {
      newQuestion.options = ['Option 1', 'Option 2']; 
    }
    
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]); 
    setQuestion("");
    updateFormData();
}

function handleFormNameChange(event: React.ChangeEvent<HTMLInputElement>) {
  setFormName(event.target.value);
  updateFormData();
}

return (
  <Form {...form}>
    <form className="space-y-4 mx-4">
      <FormItem>
        <Label className="font-bold text-xl">
          <Input
            type="text"
            value={formName}
            onChange={handleFormNameChange}
            className="border rounded p-2"
            placeholder="Untitled Form"
          />
        </Label>
      </FormItem>

      <FormItem>
        <FormLabel>First Name</FormLabel>
        <FormControl>
          <Input placeholder="Enter your first name" className="border rounded p-2" />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel>Last Name</FormLabel>
        <FormControl>
          <Input placeholder="Enter your last name" className="border rounded p-2" />
        </FormControl>
        <FormMessage />
      </FormItem>

      {selectedFields.map((selectedField, index) => (
        <FormItem key={index}>
          {questions[index] && <Label className="font-semibold">{questions[index].question}</Label>}
          {selectedField === 'TextField' && (
            <Input type="text" placeholder="Textfield" className="border rounded p-2" />
          )}
          {selectedField === 'Email' && (
            <Input type="email" placeholder="Email" className="border rounded p-2" />
          )}
          {selectedField === 'TextArea' && (
            <Textarea placeholder="Message" className="border rounded p-2" />
          )}
          {selectedField === 'Checkbox' && (
            <div className="items-top flex flex-col space-y-2">
              {questions[index].options?.map((option, optionIndex) => (
                <div key={optionIndex} className="flex space-x-2 items-center">
                  <Checkbox id={`checkboxField${index}_${optionIndex}`} />
                  <input
                    type="text"
                    value={option || ''}
                    onChange={(e) => handleOptionChange(index, optionIndex, e)} 
                    placeholder="Enter option"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border rounded p-2"
                  />
                </div>
              ))}
              <Button className="w-24 rounded-lg" type="button" onClick={() => handleAddOption(index)}>Add Option</Button>
            </div>
          )}
          {selectedField === 'Radio' && (
            <div>
              <RadioGroup defaultValue={`radioField${index}`}>
                {questions[index]?.options?.map((option, optionIndex) => (
                  <Label key={optionIndex} className="flex items-center">
                    <RadioGroupItem value={option} className="mr-2" />
                    <input
                      type="text"
                      onChange={(e) => handleRadioOptionChange(index, optionIndex, e)}
                      value={option}
                      placeholder={`Enter option ${optionIndex + 1}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border rounded p-2"
                    />
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}
        </FormItem>
      ))}

      <FormItem>
        <Input placeholder="Enter your question" value={question} onChange={(e) => setQuestion(e.target.value)} className="border rounded p-2" />
        <DropdownMenu>
          <DropdownMenuTrigger>Add New Fields</DropdownMenuTrigger>
          <AddNewField setSelectedField={handleAddField} />
        </DropdownMenu>
      </FormItem>
      
      <Button className="w-24 rounded-lg" type="submit">Submit</Button>
    </form>
  </Form>
);
}