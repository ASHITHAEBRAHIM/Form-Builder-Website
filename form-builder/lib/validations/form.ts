import { z } from "zod";

 const formSchema = z.object({
    formName: z.string().min(1, "Form name is required").max(255)
 });

 const questionSchema = z.object({
    question: z.string().min(1,'Question is required').max(255),
    type: z.enum(['Radio', 'Checkbox', 'Button', 'TextField', 'TextArea', 'Email']).nullable().optional(),
  });

  const optionSchema = z.string();
  export const questionWithOptionsSchema = z.object({
    question: z.string(),
    type: z.enum(['Radio', 'Checkbox']), // Adjust as needed
    options: z.array(optionSchema),
  });
  
  const responseSchema = z.object({
    answer: z.string().min(1, "Answer is required")
  });
  
  const submissionSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(255),
    lastName: z.string().min(1,'Last name is required').max(255),
  });

  export { formSchema, questionSchema, responseSchema, submissionSchema };