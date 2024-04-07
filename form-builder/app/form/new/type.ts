export interface FormQuestion {
  question: string;
  type: string;
  options?: string[]; 
}

export interface FormData {
  formName: string;
  selectedFields: string[];
  questions: FormQuestion[]; 
}