import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Navbar from './Navbar'
import Signin from './Signin'

export default function Home() {
  return (
   <>
      <Navbar/>
      <div className=" flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <Image src="/Logo.png"  alt="Logo" width={205} height={175}/>
        <h1 className='text-4xl font-bold text-center mt-7'>Create Custom FORMS with our <br /> easy to use form builder</h1>
        <p className='mt-7'>Get started by creating an account for FREE!</p>
        <div className='flex flex-col md:flex-row items-center gap-4 mt-7'>
        <Signin/>
        <Button className='bg-blue-900 text-white'>Get Started</Button>
        </div>
      </div>
      </>
  )
}
