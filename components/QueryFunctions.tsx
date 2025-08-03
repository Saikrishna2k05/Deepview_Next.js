import axios from 'axios'
import { CreateBlogType } from 'types/CreateBlogType';
export async function getPosts()
{
    const res=await axios.get('http://localhost:3000/api/blogs');
    return res.data.blogs;
}

export async function createPost(blog:CreateBlogType)
{
    const res=await axios.post('http://localhost:3000/api/blogs', blog);
    return res.data.blog; 
}

export async function deletePost(id:number)
{
    await axios.delete(`http://localhost:3000/api/blogs/${id}`);
    return id;
}