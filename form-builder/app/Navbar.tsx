'use client'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaWpforms } from "react-icons/fa"


const Navbar = () => {
  const {status, data: session } = useSession();
  const router = useRouter();
  const handleLogin = async() => {
   await signIn('/api/auth/signin'); 
  };

  return (
<nav className='flex justify-between items-center px-5 h-14 bg-black text-white'>
    <div className="flex items-center space-x-6 ">
        <Link className='bg-blue-700' href='/'><FaWpforms /></Link>
        <Link href='/'>Form Builder</Link>    
    </div>
    <div className="flex items-center space-x-6">
        <Link href='/'>Features</Link>
        <Link href='/'>Pricing</Link>
        <Link href='/'>Contact</Link>
        {status === 'authenticated' && <Button onClick={() => router.push('/form/list')} className='bg-blue-900 text-white'>Go to Forms</Button>}
        {status === 'unauthenticated' && <Button onClick={handleLogin} className='bg-blue-900 text-white'>Login</Button>}
        <Button className='bg-blue-900 text-white'>Create Account</Button>
    </div>
</nav>
  )
}

export default Navbar