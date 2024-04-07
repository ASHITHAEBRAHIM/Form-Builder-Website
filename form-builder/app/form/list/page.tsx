'use client'
import Sidebar from '@/app/_components/layout/Sidebar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import FormAction from './FormAction'
import FormTable from './FormTable'

const FormListPage = () => {
  const [formCount, setFormCount] = useState<number>(0);
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('/api/form');
        setFormCount(response.data.length);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);
  return (
    <div className="flex flex-col">
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <Sidebar/>
        <div className="flex flex-col">
        <FormAction formCount={formCount}/>
        <FormTable />
            </div>
        </div>
    </div>
  )
}

export default FormListPage