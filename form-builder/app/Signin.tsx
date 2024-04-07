'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

const Signin = () => {
    const {status, data: session } = useSession();
    const router = useRouter();
    const handleLogin = async() => {
    await signIn('/api/auth/signin'); 
   };
   useEffect(() => {
    if (status === 'authenticated') {
        router.push('/form/list');
    }
}, [status, router]);
  return (
    <div>
         <Button onClick={handleLogin} className='bg-blue-900 text-white'>Login</Button>
    </div>
  )
}

export default Signin
