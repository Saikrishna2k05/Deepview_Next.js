'use client'
import React from 'react'
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import ProfileDropdown from './ProfileDropdown';

const AuthNavbar = ({session}:{session:any}) => {
  const pathname=usePathname();
  const logoutHandler=async()=>{
    await signOut({redirect:true, callbackUrl:'/'});
  }
  return (
    <>
        <div className="w-full h-16 border-b flex justify-between items-center border-[rgb(42,42,42)]">
              <div>
                <Image  src="/deepview1.png" alt="Logo" width={150} height={100} className='ml-6' priority></Image>
              </div>
              <div className='flex items-center gap-6'>
                <Link href='/blogs' className={`font-medium ${pathname==='/blogs'?'text-[#01b19d]':'text-white'}`}>Blogs</Link>
                <Link href='/write'  className={`font-medium flex  items-center gap-0.5 ${pathname==='/write'?'text-[#01b19d]':'text-white'}`}> 
                  <FiEdit/>
                  <span>Write</span>
                </Link>
                <ProfileDropdown user={session?.user}/>
                <button
          className='px-4 py-2 mr-4 rounded-2xl transition-all duration-200 bg-white text-black hover:bg-gray-200 cursor-pointer'
          onClick={logoutHandler}
        >
          Logout
        </button>
              </div>
        </div>
        </>
)
}

export default AuthNavbar