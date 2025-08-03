'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getPosts } from "./QueryFunctions";
import { CreateBlogType } from "types/CreateBlogType";
import { BlogType } from "types/BlogType";
import toast from 'react-hot-toast';

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
      toast.success('Blog published successfully');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message || 'Something went wrong';
      toast.error(`Failed to publish blog: ${message}`);
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