'use client'
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { useState } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import toast from 'react-hot-toast'
import { BlogType } from 'types/BlogType';
import { UserBlogType } from 'types/UserBlogType';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDeletePost } from './ReactQueries';

const UserBlogsCard = ({
  id,
  title,
  subtitle,
  createdAt,
  thumbnail,
  author,
}: UserBlogType) => {
    const router=useRouter();
    const [showModal, setShowModal]=useState(false);
    const {mutateAsync}=useDeletePost();
    function editHandler(id:number)
    {
        router.push(`/editBlog/${id}`) 
    }
    function deleteHandler(id:number)
    {
        setShowModal(true);
    }
  const handleConfirmDelete = async () => {
  try { 
    await mutateAsync(id);
    toast.success("Blog deleted successfully!");
  } catch (err) {
    toast.error("Failed to delete ");
  } finally {
    setShowModal(false);
  }
};


    const formattedDate = format(new Date(createdAt), 'dd/MM/yy');
  return (
    <>
      <div className="flex flex-col sm:flex-row bg-[#1f1f1f] text-white rounded-xl border border-[#2a2a2a] p-4 gap-4 mb-8 hover:shadow-md transition-all">
        
        <Image
            src={thumbnail}
            alt="Thumbnail"
            width={128} 
            height={96} 
            className="w-full sm:w-32 h-48 sm:h-24 object-cover rounded-lg border border-[#2a2a2a]"
            priority
        />

        <div className="flex flex-col sm:flex-row flex-1 justify-between gap-2">
          
          <div className="flex-1">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-300">{subtitle}</p>
            <p className="text-sm text-gray-400 mt-1">By {author?.name || 'You'}</p>
          </div>

          <div className="flex sm:flex-col justify-between sm:items-end sm:text-right text-sm text-gray-400">
            <span> {formattedDate}</span>
            <div className="flex gap-3 mt-2 sm:mt-3 justify-end">
              <button onClick={()=>editHandler(id)} className="hover:text-blue-400 cursor-pointer">
                <FiEdit size={18} />
              </button>
              <button onClick={() => deleteHandler(id)} className="hover:text-red-400 cursor-pointer">
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
      {showModal && (
      <ConfirmDeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    )}
    </>
  );
};

export default UserBlogsCard;
