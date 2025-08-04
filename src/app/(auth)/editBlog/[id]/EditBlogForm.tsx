'use client';

import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePost } from 'components/ReactQueries';
import ThumbnailUpload from 'components/ThumbnailUpload';
import toast from 'react-hot-toast';
import { UpdateBlogType } from 'types/UpdateBlogType';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

const blogSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  description: z.string(),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  category: z.string().min(1, 'Category is required'),
});

const EditBlogForm = ({ initialData }: { initialData: UpdateBlogType }) => {
  const { mutateAsync } = useUpdatePost();
  const editor = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof blogSchema>>({
    defaultValues: initialData,
    resolver: zodResolver(blogSchema),
  });

  const onSubmit = async (data: UpdateBlogType) => {
    try {
      if(data.description==="<p><br></p>")
      {
        return toast.error("Description required");
      }
      await mutateAsync({
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        thumbnail: data.thumbnail,
        description: data.description,
        category: data.category,
      });
      toast.success('Blog updated successfully');
    } catch (err) {
      toast.error("Couldn't update Blog");
    }
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
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <section className="w-full h-14 bg-[#111] border border-[#2a2a2a] rounded-xl flex items-center">
          <input
            type="text"
            {...register('subtitle')}
            placeholder="Write a subtitle..."
            className="w-full text-xl font-medium h-10 rounded-xl outline-none p-5 bg-transparent text-white"
          />
        </section>
        {errors.subtitle && <p className="text-red-500 text-sm">{errors.subtitle.message}</p>}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#111]">
                          <JoditEditor
              ref={editor}
              value={field.value}
              onBlur={(newContent) => field.onChange(newContent)}
              config={{
                theme: 'midnight',
                readonly: false,
                height: 400,
                toolbarSticky: false,
                toolbarButtonSize: 'middle',
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
            </div>
          )}
        />

        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => (
            <>
              <ThumbnailUpload field={field} />
              {errors.thumbnail && (
                <p className="text-red-500 text-sm">{'Thumbnail is required'}</p>
              )}
            </>
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
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

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

export default EditBlogForm;
