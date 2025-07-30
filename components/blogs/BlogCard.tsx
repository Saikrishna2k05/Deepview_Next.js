'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

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

const BlogCard = (data:BlogType) => {
  const router = useRouter();
//   const role = useSelector((state) => state.auth.user?.role);
  const formattedDate = format(new Date(data.createdAt), 'dd/MM/yy');
  const readMoreHandler = () => {
    // router.push(`/Blogs/${_id}`);
    console.log("Read more")
  };

  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden transition duration-300 hover:scale-[1.02] flex flex-col">
      <img src={data.thumbnail} alt={data.title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-400 mb-1">
          By {data.author.name} | {data.category} | {formattedDate}
        </p>
        <h2 className="text-white font-semibold text-lg mb-2">{data.title}</h2>
        <p className="text-gray-400 text-sm mb-4">{data.subtitle}</p>
        <div className="mt-auto flex gap-1">
          <button
            className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium hover:bg-[#ffffffcc] cursor-pointer"
            onClick={readMoreHandler}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
