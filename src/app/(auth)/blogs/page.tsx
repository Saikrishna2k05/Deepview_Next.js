import { redirect } from 'next/navigation'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getPosts } from 'components/QueryFunctions'
import Blogs from './blogs'
import { auth } from '@/app/auth'

export default async function BlogsPage() {
  const session=await auth();
  const user=session?.user;
  if(!user) return redirect('/');
  const queryClient=new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:["blogs"],
    queryFn: getPosts
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Blogs/>
    </HydrationBoundary>
  )
}

