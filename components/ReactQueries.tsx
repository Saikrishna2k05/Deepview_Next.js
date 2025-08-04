'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getPosts, updatePost } from "./QueryFunctions";
import { CreateBlogType } from "types/CreateBlogType";
import { BlogType } from "types/BlogType";
import toast from 'react-hot-toast';
import { UpdateBlogType } from "types/UpdateBlogType";

export function usePosts() {
  return useQuery({ queryKey: ['blogs'], queryFn: getPosts });
}

export function useCreatePosts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blog: CreateBlogType) => createPost(blog),
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], (old: BlogType[] | undefined) => {
        return old ? [...old, newBlog] : [newBlog];
      });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (id) => {
      queryClient.setQueryData(['blogs'], (old: BlogType[] | undefined) => {
        if (!old) return [];
        return old.filter((blog) => blog.id !== id);
      });
    },
  });
}

export function useUpdatePost()
{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:(blog:UpdateBlogType)=> updatePost(blog),
    onSuccess:(updatedBlog)=>{
      queryClient.setQueryData(['blogs'],(old:BlogType[])=>{
          return old.map((blog)=>blog.id===updatedBlog.id?updatedBlog:blog);          
      })
    }
  })
}

