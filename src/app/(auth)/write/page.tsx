'use client'
import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ThumbnailUpload from '../../../../components/ThumbnailUpload';
import toast  from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { BlogType } from 'types/BlogType';

type WriteBlogType={
  title: string
  subtitle: string
  description: string
  thumbnail: string | null 
  category: string
}


const Write = () => {
    const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

  const editor = useRef(null);
  const defaultValues = {
  title: '',
  subtitle: '',
  description: '',
  thumbnail: null,
  category: '',
};

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<WriteBlogType>({defaultValues});

  const onSubmit = async (data:WriteBlogType) => {
    console.log(data);
    
  };

  return (
    <div className="text-white m-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <header className="w-full h-16 bg-[#111] border border-[#2a2a2a] rounded-xl flex items-center">
          <input
            type="text"
            {...register('title')}
            placeholder="Your Blog Title Here..."
            className="w-full text-3xl font-extrabold h-10 rounded-xl outline-none p-5 bg-transparent text-white"
          />
        </header>

        <section className="w-full h-14 bg-[#111] border border-[#2a2a2a] rounded-xl flex items-center">
          <input
            type="text"
            {...register('subtitle')}
            placeholder="Write a subtitle..."
            className="w-full text-xl font-medium h-10 rounded-xl outline-none p-5 bg-transparent text-white"
          />
        </section>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              onBlur={(newContent) => field.onChange(newContent)}
              config={{
                theme: 'midnight',
                readonly: false,
                height: 400,
                toolbarSticky: false,
                iframe: false,
                toolbarButtonSize: 'middle',
                enter: 'p', 
                buttons: [
                  'bold', 'italic', 'underline', '|',
                  'ul', 'ol', '|',
                  'font', 'fontsize', 'brush', 'paragraph', '|',
                  'align', 'undo', 'redo', '|',
                  'hr', 'link', 'image', 'video', '|'
                ],
                uploader: {
                  insertImageAsBase64URI: true,
                },
                showCharsCounter: false,
                showWordsCounter: false,
                showXPathInStatusbar: false,
              }}
            />
          )}
        />

        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => (
            <ThumbnailUpload field={field} />
          )}
        />

        <div className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl p-4">
          <label className="block text-white text-lg mb-2">Select Category</label>
          <select
            {...register('category')}
            className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white outline-none"
          >
            <option value="" disabled>Select a category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Tech">Tech</option>
            <option value="Education">Education</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-black bg-[#01b19d] hover:bg-[#01a18c] rounded-xl border border-[#2a2a2a] cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default Write;