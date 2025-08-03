'use client'
import BlogCard from 'components/BlogCard'
import { BlogType } from 'types/BlogType'
import { usePosts } from 'components/ReactQueries'

const Blogs = () => {
  const { data: blogs } = usePosts()
  return (
    <div className="w-full px-10 mt-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog: BlogType) => (
              <BlogCard key={blog.id} {...blog}/>
            ))}
      </div>
    </div>
  )
}
export default Blogs
