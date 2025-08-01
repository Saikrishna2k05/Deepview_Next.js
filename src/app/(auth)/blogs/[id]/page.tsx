import { prisma } from '../../../../../lib/prisma'
import { notFound } from 'next/navigation' // 1. Import notFound
import Image from 'next/image';
import BlogMetaData from 'components/BlogMetaData';

export default async function blogDetails({ params }: { params: { id: string } }) {
  const { id } = await params;
  const blog = await prisma.blogs.findUnique({
    where: { id: Number(id) },
    include: {
      author: true,
    },
  });

  if (!blog) {
    notFound(); 
  }

  return (
    <div className='max-w-6xl mx-auto p-10'>
      <div className='text-white font-extrabold text-3xl'>{blog.title}</div>
      <div className='text-white font-serif text-xl mt-4'>{blog.subtitle}</div>
      <div className="mt-4">
        <BlogMetaData author={{name: blog.author.name ?? 'anonymous',
    image: blog.author.image ?? '/default-avatar.png'}} createdAt={blog.createdAt} description={blog.description} />
      </div>
      <Image
        src={blog.thumbnail}
        alt="Blog thumbnail"
        className="w-full mt-6 rounded-lg"
        width={1072}
        height={603}
      />
      <div
        className="prose prose-invert max-w-none text-white text-xl mt-6 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
    </div>
  );
}