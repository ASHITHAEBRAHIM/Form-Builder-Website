'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
const Signin = () => {
    const {status, data: session } = useSession();
    const router = useRouter();
    const handleLogin = async() => {
    await signIn('/api/auth/signin'); 
   };
  return (
    <div>
         {status === 'authenticated' && <Button onClick={() => router.push('/form/list')} className='bg-blue-900 text-white'>Go to Forms</Button>}
         {status === 'unauthenticated' && <Button onClick={handleLogin} className='bg-blue-900 text-white'>Login</Button>}
    </div>
  )
}

export default Signin
