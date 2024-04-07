'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaWpforms } from 'react-icons/fa'

const Sidebar = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: false 
    });
    router.push('/'); 
  };
  return (
<div className="sidebar bg-black text-white min-h-screen w-64 flex flex-col justify-between">
      <aside>
        <div className="flex items-center space-x-4 py-8 px-6">
          <Link href='/'><FaWpforms className="text-3xl" /></Link>
          <Link href='/' className="text-lg font-semibold">Form Builder</Link>    
        </div>
        <nav className='text-sm'>
          <ul className='space-y-2 px-6'>
            <li>
              <Link href='/form/list'>My Forms</Link>
            </li>
            <li>
              <Link href='/'>Analytics</Link>
            </li>
            <li>
              <Link href='/'>Knowledge Base</Link>
            </li>
            <li>
              <Link href='/'>Help and Support</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className='flex flex-col items-start pb-8 px-6'>
        <Link href='/' className="text-sm">My Profile</Link>
        <Link href='/api/auth/signout' onClick={handleSignOut} className="text-sm">Logout</Link>
      </div>
    </div>
  );
}

export default Sidebar