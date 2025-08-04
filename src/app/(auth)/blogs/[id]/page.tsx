import { prisma } from '../../../../../lib/prisma'
import { notFound } from 'next/navigation' 
import Image from 'next/image';
import BlogMetaData from 'components/BlogMetaData';

export default async function blogDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
if (isNaN(numericId)) return notFound();
  const blog = await prisma.blogs.findUnique({
    where: { id: Number(numericId) },
    include: {
      author: true,
    },
  });

  if (!blog) {
    return notFound(); 
  }

  return (
    <div className='max-w-6xl mx-auto p-10'>
      <div className='text-white font-extrabold text-3xl'>{blog.title}</div>
      <div className='text-white font-serif text-xl mt-4'>{blog.subtitle}</div>
      <div className="mt-4">
        <BlogMetaData author={{name: blog.author?.name ?? 'anonymous',
    image: blog.author.image!, id:blog.author.id}} createdAt={blog.createdAt} description={blog.description} />
      </div>
      <Image
        src={blog.thumbnail}
        alt="Blog thumbnail"
        className="w-full mt-6 rounded-lg"
        width={1072}
        height={603}
        priority
      />
      <div
        className="prose prose-invert max-w-none text-white text-xl mt-6 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
    </div>
  );
}