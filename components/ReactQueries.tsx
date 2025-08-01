'use client'
import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./QueryFunctions"

export function usePosts() {
  return useQuery({ queryKey: ["blogs"], queryFn: getPosts })
}
