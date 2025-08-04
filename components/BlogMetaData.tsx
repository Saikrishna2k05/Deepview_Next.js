'use client'
import { FaUserCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { FiShare2 } from "react-icons/fi";
import toast from 'react-hot-toast'
import readingTime from 'reading-time';
import { BlogType } from 'types/BlogType';
import Image from 'next/image';
type BlogMetaDataProps = Pick<BlogType, 'author' | 'createdAt' | 'description'>;

const BlogMetaData = ({author, createdAt, description}:BlogMetaDataProps) => {
  if (!author) return null;
  const stats = readingTime(description); 
  const formattedDate = createdAt ? format(new Date(createdAt), 'dd MMM yyyy') : 'Unknown';
  const handleShare = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.success('Link copied to clipboard!');
};

  return (
    <div className="flex items-center gap-2 text-sm text-white/80 mb-4  ">
      {author?.image ? (
        <Image
        src={author.image}
        alt="Author"
        width={32}
        height={32}
        className="rounded-full object-cover"
        priority
      />

      ) : (
        <FaUserCircle className="w-8 h-8" />
      )}
      <div className="flex flex-col">
        <span className="text-white font-semibold text-xl">{author.name}</span>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center ml-auto gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
        <div>Published on {formattedDate} | {stats.text} </div>
        <button onClick={handleShare}
            title='Copy link to clipboard'
            className="flex items-center cursor-pointer gap-1 px-3 py-1 text-white border border-gray-500 rounded hover:bg-white/10 transition-all text-xs sm:text-sm">
            <FiShare2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
        </button>
     </div>
      </div>
  );
};

export default BlogMetaData;
