'use client'
import { signIn } from "next-auth/react"
 

export default function SignIn() {
  const handleLogin = () => {
    signIn("google", { callbackUrl: '/blogs' })
  }

  return (
    <button
      onClick={handleLogin}
      className="w-80 h-10 flex items-center justify-center gap-3 px-4 py-2 rounded-md bg-white border border-gray-300 shadow cursor-pointer hover:bg-gray-100 transition duration-200 text-sm font-medium text-black"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google Logo"
        className="w-5 h-5"
      />
      <span>Continue with Google</span>
    </button>
  )
}
