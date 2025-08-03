'use client'
import React from 'react';
import { format } from 'date-fns';
import {BlogType} from '../types/BlogType'
import Link from 'next/link';
import Image from 'next/image';



const BlogCard = (data:BlogType) => {
  const formattedDate = format(new Date(data.createdAt), 'dd/MM/yy');

  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden transition duration-300 hover:scale-[1.02] flex flex-col">
      <Image
      src={data.thumbnail}
      alt={data.title}
      width={400}
      height={200}
      className="w-full h-48 object-cover"
      priority
    />

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-400 mb-1">
          By {data.author.name} | {data.category} | {formattedDate}
        </p>
        <h2 className="text-white font-semibold text-lg mb-2">{data.title}</h2>
        <p className="text-gray-400 text-sm mb-4">{data.subtitle}</p>
        <div className="mt-auto flex gap-1">
          <Link href={`/blogs/${data.id}`} prefetch className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium hover:bg-[#ffffffcc] cursor-pointer">Read more</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
