import { auth, signOut } from '@/app/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const Blogs = async() => {
    const session=await auth();
    const user=session?.user;
    if(!user) redirect('/');
  return (
    <>
    <div>{`Hi ${user?.name}`}</div>
    <div>Blogs</div>
    <form
          action={async () => {
            "use server"
            await signOut({ redirectTo: '/' })
          }}
        >
          <button type="submit" className='bg-white text-black p-2 cursor-pointer rounded-2xl'>Sign out</button>
    </form>
    </>
  )
}

export default Blogs