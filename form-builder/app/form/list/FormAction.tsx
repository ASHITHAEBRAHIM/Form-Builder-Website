'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
interface Props {
  formCount: number;
}
const FormAction = ({ formCount }: Props) => {
  return (<div>
<div className='flex justify-between items-center py-8 px-6'>
        <Button>
        <Link href="/form/new">Create New Form</Link>
      </Button>
    </div>
    <div className='flex justify-between items-center mx-8 py-8 '>
        <h1 className='text-2xl font-bold'>My Forms({formCount})</h1>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
        </div>
    </div>
  </div>
  )
}

export default FormAction