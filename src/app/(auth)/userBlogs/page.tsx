'use client'
import UserBlogsCard from '../../../../components/UserBlogsCard'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePosts } from 'components/ReactQueries';
import { BlogType } from 'types/BlogType';


const UserBlogs = () => {
  const router=useRouter();
  const {data:session, status}=useSession();
  const { data: blogs = [], isLoading } = usePosts();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);
  if (status === 'loading') return <div>Loading...</div>;
  const userBlogs=blogs.filter((blog:BlogType)=>blog.author.id===session?.user?.id);
  return (
  <div className="max-w-6xl mx-auto px-4">
    {userBlogs.length==0? (
      <div
        className="flex flex-col items-center justify-center text-white"
        style={{ height: 'calc(90vh - 4rem)' }}
      >
        <p className="text-lg sm:text-3xl font-medium mb-2">
          You haven't written any blogs yet.
        </p>
        <p className="text-sm sm:text-xl font-thin text-white">
          Start sharing your thoughts with the world!
        </p>
      </div>
    ) : (
      userBlogs.map((blog:BlogType, index:number) => (
        <div className={index === 0 ? 'mt-8' : ''} key={blog.id}>
          <UserBlogsCard {...blog} />
        </div>
      ))
    )}
  </div>
);

}

export default UserBlogs