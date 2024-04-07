import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormData, FormQuestion } from './type';

interface NewFormActionProps {
  formData: FormData;
  questions: FormQuestion[];
}

const NewFormAction: React.FC<NewFormActionProps> = ({ formData, questions }) => {
  const [formLink, setFormLink] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false); 
  const router = useRouter();

  async function handlePublish() {
    try {
      const updatedFormData = { ...formData, questions }; 
      console.log("Updated Form Data:", updatedFormData);
      const response = await axios.post('/api/form', updatedFormData); 
      const formId = response.data.data.id;
      const newFormLink = `${window.location.origin}/form/list/${formId}`;
      setFormLink(newFormLink);
      setShowDialog(true); 
    } catch (error) {
      console.error('Error publishing form:', error);
      alert('Failed to publish form. Please try again.');
    }
  }

  function copyLinkToClipboard() {
    if (formLink) {
      navigator.clipboard.writeText(formLink);
      alert('Form link copied to clipboard!');
    }
  }

  function handleModalClose() {
    setShowDialog(false); 
    router.refresh(); 
  }

  return (
    <div className='flex justify-between items-center py-8 px-6'>
      <h1 className='text-2xl font-bold'>Create New Form</h1>
      <Button onClick={handlePublish}>Publish Form</Button>

      <Dialog open={showDialog}>
        <DialogContent>
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Form published successfully!</h2>
              </div>
              <div className="modal-body">
                <Label>Access your form at:</Label>
                <Input type="text" value={formLink || ''} readOnly />
              </div>
              <DialogFooter>
                <div className='mt-2'>
                  <Button onClick={copyLinkToClipboard}>Copy Link</Button>
                  <Button className='ml-2' onClick={handleModalClose}>Close</Button>
                </div>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewFormAction;
