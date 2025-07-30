import { auth, signOut } from '@/app/auth'
import { redirect } from 'next/navigation';
import React from 'react'
import axios from 'axios'
import BlogCard from 'components/blogs/BlogCard';

type BlogType= {
  id:number,
  title:string,
  subtitle:string,
  thumbnail:string,
  author:{
    name:string
  },
  category:string,
  createdAt: Date,
}

const Blogs = async() => {
    const session=await auth();
    const user=session?.user;
    if(!user) redirect('/');
    const res=await axios.get('http://localhost:3000/api/blogs');
    const blogs=res.data.blogs;
  return (
    <>
    <div>{`Hi ${user?.name}`}</div>
    <div>Blogs</div>
    
    <div className="w-full px-10 mt-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {blogs.map((blog: BlogType)=><BlogCard key={blog.id} {...blog}/>)}
          </div>
        </div>
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