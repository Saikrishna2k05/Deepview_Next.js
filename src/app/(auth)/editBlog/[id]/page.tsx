// app/blogs/[id]/edit/page.tsx

import { notFound } from 'next/navigation';
import EditBlogForm from './EditBlogForm';
import { prisma } from '../../../../../lib/prisma';
import { BlogType } from 'types/BlogType';

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{id: string}> ;
}) {
  const {id}=await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  const blog :BlogType | null= await prisma.blogs.findUnique({
    where: { id: numericId },
    include: {
      author: {
        select: {
          id:true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (!blog) {
    notFound();
  }

  return <EditBlogForm initialData={{
    id:blog.id,
    title:blog.title,
    subtitle:blog.subtitle,
    description:blog.description,
    thumbnail:blog.thumbnail,
    category: blog.category
  }}/>;
}
