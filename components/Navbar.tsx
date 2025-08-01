"use client"
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Navbar = () => {
  const pathname=usePathname();
  return (
    <>
        <div className="w-full h-16 border-b flex justify-between items-center border-[rgb(42,42,42)]">
              <div>
                <Image  src="/deepview1.png" alt="Logo" width={150} height={100} className='ml-6' priority></Image>
              </div>
              <div className='flex items-center gap-6'>
                <Link href='/' className={`font-medium ${pathname==='/'?'text-[#01b19d]':'text-white'}`}>Home</Link>
                <Link href='/about'  className={`font-medium ${pathname==='/about'?'text-[#01b19d]':'text-white'}`}>About</Link>
                <Link href="/login" className="bg-white px-4 py-2 text-black cursor-pointer rounded-2xl hover:bg-[#ffffffc4]">
                Login       
                </Link>
                <Link href="/signup" className="bg-white px-4 py-2 text-black cursor-pointer rounded-2xl hover:bg-[#ffffffc4]">
                Signup       
                </Link>
              </div>
        </div>
    </>
  )
}

export default Navbar