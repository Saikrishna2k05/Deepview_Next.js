'use client';
import React from 'react'
import GoogleSignin from '../../../../components/GoogleSignin'
import { auth } from '../../auth'
import { log } from 'console';
import { signOut } from '@/app/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  async function submitfn(data: FormFields) {
    const { email, password } = data;
    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (response?.error) {
      toast.error('Invalid email or Password');
      return;
    }
    // toast.success("Login successfull")
    router.push('/blogs');
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-6 overflow-y-auto w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 w-96 px-6 py-8 bg-[#111] border border-[#2a2a2a] rounded-2xl items-center">

        <div className="text-white text-center">
          <h2 className="text-2xl font-semibold">Welcome to Deepview</h2>
          <h5 className="font-extralight opacity-70">
            Sign in to unlock stories that matter.
          </h5>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitfn)} className="flex flex-col gap-y-4 items-center w-full">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-white text-sm">Email</label>
            <input
              {...register("email")}
              placeholder="name@email.com"
              className="bg-black px-4 py-2 border border-[#2a2a2a] rounded-xl focus:outline-none text-white"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="text-white text-sm">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="bg-black px-4 py-2 border border-[#2a2a2a] rounded-xl focus:outline-none text-white"
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
          </div>

          <button
        type="submit"
        disabled={isSubmitting}
        className="w-80 h-10 flex items-center justify-center gap-3 px-4 py-2 rounded-md bg-white border border-gray-300 shadow cursor-pointer hover:bg-gray-100 transition duration-200 text-sm font-medium text-black"
      >
        {isSubmitting ? 'Loading...' : 'Login'}
      </button>

        </form>

        {/* Signup Link */}
        {/* <p className="text-center text-md text-white">
          Don’t have an account?{' '}
          <Link href="/signup" className="underline hover:text-gray-300">
            Signup
          </Link>
        </p> */}

        {/* Divider */}
        <div className="relative w-full flex items-center justify-center">
          <div className="absolute w-full border-t border-[#2a2a2a]"></div>
          <span className="bg-[#111] px-4 text-sm text-[#676767] z-10">or</span>
        </div>

        <GoogleSignin/>
      </div>
    </div>
  );
};

export default Login;
