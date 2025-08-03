'use client'
import { signIn } from "next-auth/react"
import Image from 'next/image'

export default function SignIn() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: '/blogs' })
  }

  return (
    <button
      onClick={handleLogin}
      className="w-80 h-10 flex items-center justify-center gap-3 px-4 py-2 rounded-md bg-white border border-gray-300 shadow cursor-pointer hover:bg-gray-100 transition duration-200 text-sm font-medium text-black"
    >
      <Image
  src="https://www.svgrepo.com/show/475656/google-color.svg"
  alt="Google Logo"
  width={20}
  height={20}
  className="w-5 h-5"
  priority
/>



      <span>Continue with Google</span>
    </button>
  )
}
