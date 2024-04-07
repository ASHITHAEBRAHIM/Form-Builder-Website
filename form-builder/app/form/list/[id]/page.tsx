'use client'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(255),
  lastName: z.string().min(1,'Last name is required').max(255),
  answer:  z.array(z.string().min(1, "Answer is required"))
});

const FormPage = () => {
  const [formData, setFormData] = useState<any>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      answer:[]
    },
  })

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    const fetchFormData = async (id: string) => {
      try {
        const response = await axios.get(`/api/form/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    
    if (id) {
      fetchFormData(id);
    }
  }, []); 

  const handleSubmit = async () => {
    console.log('Form submission triggered');
    try {
      const { firstName, lastName, answer } = form.getValues(); 
      const formId = formData.id;
      const responses = answer.map((value, index) => ({ questionId: formData.questions[index].id, answer: value }));
  
      const responseData = {
        firstName,
        lastName,
        responses
      };
  
      const response = await axios.post(`/api/submitForm/${formId}`, responseData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Form submission successful:', response.data);
      setFormSubmitted(true); 
      form.reset();

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const handleAddAnotherResponse = () => {
    setFormSubmitted(false); 
    form.reset(); 
  };

  
  
  if (!formData) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
    {formSubmitted ? (
          <div className='text-center'>
            <p className='font-bold'>Form submitted successfully.</p>
            <Button className="mt-2" onClick={handleAddAnotherResponse}>Add Another Response</Button>
          </div>
        ) : (
    <Form {...form}>
  <form className="space-y-8 min-h-screen" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormItem>
          <Label className="font-bold text-2xl">
            <h2>{formData.formName}</h2>
          </Label>
      </FormItem>
        <FormField 
         control={form.control}
         name='firstName'
         render={({field})=>{
         return <FormItem>
          <FormLabel className="font-bold">First Name</FormLabel>
          <FormControl>
            <Input type='text' placeholder='Enter the first name' {...field}  value={field.value || ''} onChange={field.onChange}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
        }}/>
        <FormField 
         control={form.control}
         name='lastName'
         render={({field})=>{
         return <FormItem>
          <FormLabel className="font-bold">Last Name</FormLabel>
          <FormControl>
            <Input type='text' placeholder='Enter the last name' {...field}  value={field.value || ''} onChange={field.onChange}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
        }}/>


{formData.questions.map((question: any, index: number) => (
  <div key={question.id} >
   
    
    {question.type === 'TextField' && (
      <FormField
        key={question.id}
        name={`answer.${index}`}
        control={form.control}
        render={({ field }) => (
          <div>
           
            <FormLabel className="font-bold" htmlFor={`text-field-${question.id || index}`}>{question.question}</FormLabel>
            <FormControl>
              <Input className='mt-2' id={`text-field-${question.id || index}`} placeholder={question.question} {...field} value={field.value || ''} onChange={field.onChange}/>
            </FormControl>
            <FormMessage />
          </div>
        )}
      />
    )}
    {question.type === 'TextArea' && (
      <FormField
        key={question.id}
        name={`answer.${index}`}
        control={form.control}
       
        render={({ field }) => (
          <div>
             
            <FormLabel className="font-bold" htmlFor={`text-area-${question.id || index}`}>{question.question}</FormLabel>
            <FormControl>
              <Textarea className="mt-2" id={`text-area-${question.id || index}`} placeholder={question.question} {...field} value={field.value || ''} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </div>
        )}
      />
    )}

    {question.type === 'Email' && (
      <FormField
        name={`answer.${index}`}
        control={form.control}
       
        render={({ field }) => (
          <div>
             
            <FormLabel className="font-bold" htmlFor={`email-field-${question.id || index}`}>{question.question}</FormLabel>
            <FormControl>
              <Input className="mt-2" id={`email-field-${question.id || index}`} type="email" placeholder={question.question} {...field} value={field.value || ''} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </div>
        )}
      />
    )}

   
{question.type === 'Checkbox' && (
      <FormField
        key={question.id}
        name= {`answer.${index}`}
        control={form.control}
        render={({ field }) => (
          <div>
            <FormLabel className="font-bold" htmlFor={`checkbox-field-${question.id || index}`}>
              {question.question}
            </FormLabel>
            {question.options.map((option: any, optionIndex: number) => (
              <div key={option.id} className="mt-2">
                <Checkbox
                  id={`option-${question.id || index}-${optionIndex}`}
                  checked={field.value && field.value.includes(option.value) ? true : false}
                  onCheckedChange={(checked) => {
                    const newValue = field.value ? field.value.split(',') : [];
                    if (checked) {
                      newValue.push(option.value);
                    } else {
                      const index = newValue.indexOf(option.value);
                      if (index !== -1) {
                        newValue.splice(index, 1);
                      }
                    }
                    field.onChange(newValue.join(','));
                  }}
                />
                <FormLabel className='ml-2' htmlFor={`option-${question.id || index}-${optionIndex}`}>
                  {option.value}
                </FormLabel>
              </div>
            ))}
            <FormMessage />
          </div>
        )}
      />
    )}

{question.type === 'Radio' && (
  <FormField
    key={question.id}
    name = {`answer.${index}`} 
    render={({ field }) => (
      <div>
        <FormLabel className="font-bold" htmlFor={`radio-field-${question.id || index}`}>{question.question}</FormLabel>
        <RadioGroup
          onValueChange={(value) => field.onChange(value)} 
          defaultValue={field.value} 
          className="flex flex-col space-y-1"
        >
          {question.options.map((option: any, optionIndex: number) => (
            <div  key={optionIndex} className="mt-2">
             <RadioGroupItem
              key={optionIndex}
              value={option.value} 
              id={`option-${index}-${optionIndex}`} 
            >
            </RadioGroupItem>
            <FormLabel className='ml-1'>{option.value}</FormLabel>
            </div>
          ))}
        </RadioGroup>
      </div>
    )}
  />
)}

  </div>
))}
      <Button type="submit">Submit </Button>
          </form>
    </Form>
        )}
    </div>
    </div>
  );
}

export default FormPage;
