'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'
import { FaSearch } from 'react-icons/fa';

interface ResponseActionProps {
    formName: string;
}
const ResponseAction: React.FC<ResponseActionProps> = ({ formName }) => {
  return (<div>
<div className='flex justify-between items-center py-8 px-6'>
        <Button>
        <Link href="/form/new">Download Data</Link>
      </Button>
    </div>
    <div className='flex justify-between items-center mx-8 py-8 '>
        <h1 className='text-2xl font-bold'>{formName}</h1>
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

export default ResponseAction