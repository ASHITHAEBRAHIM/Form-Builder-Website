import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaWpforms } from "react-icons/fa"
const Navbar = () => {
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
        <Button className='bg-blue-900 text-white'>Create Account</Button>
    </div>
</nav>
  )
}

export default Navbar
