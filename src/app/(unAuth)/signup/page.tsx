'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react';


const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be atleast 8 characters'),
});

type FormFields = z.infer<typeof schema>;


const Signup = () => {
  const router=useRouter();
  async function submitfn(data: FormFields) {
  try {
    await axios.post('http://localhost:3000/api/signup', data)
    await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        toast.success('Login successful!');
        router.push('/blogs');
  } catch (err: any) {
          if (err.response && err.response.data.message) {
      toast.error(`Signup failed, ${err.response.data.message}`);
    } else {
      toast.error(`Signup failed, ${err.message}`);
    }

  }
}

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-y-auto py-6">
      <form
        onSubmit={handleSubmit(submitfn)}
        className="flex flex-col gap-y-4 w-96 px-6 py-8 bg-[#111] border border-[#2a2a2a] rounded-2xl items-center"
      >
        <div className="text-white text-center">
          <h2 className="text-2xl font-semibold">Create an Account</h2>
          <h5 className="font-extralight opacity-70">
            Start your journey on DeepView.
          </h5>
        </div>

        <div className="flex flex-col gap-1 w-80">
          <label htmlFor="name" className="text-white text-sm">
            Name
          </label>
          <input
            {...register('name')}
            placeholder="Your name"
            className="bg-black px-4 py-2 border border-[#2a2a2a] rounded-xl focus:outline-none text-white"
          />
          {errors.name && (
            <div className="text-red-500 text-sm">{errors.name.message}</div>
          )}
        </div>

        <div className="flex flex-col gap-1 w-80">
          <label htmlFor="email" className="text-white text-sm">
            Email
          </label>
          <input
            {...register('email')}
            placeholder="name@email.com"
            className="bg-black px-4 py-2 border border-[#2a2a2a] rounded-xl focus:outline-none text-white"
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}
        </div>

        <div className="flex flex-col gap-1 w-80">
          <label htmlFor="password" className="text-white text-sm">
            Password
          </label>
          <input
            type="password"
            {...register('password')}
            placeholder="••••••••"
            className="bg-black px-4 py-2 border border-[#2a2a2a] rounded-xl focus:outline-none text-white"
          />
          {errors.password && (
            <div className="text-red-500 text-sm">{errors.password.message}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white w-80 h-10 text-md text-black rounded-xl hover:bg-[#ffffffd4] cursor-pointer font-medium flex items-center justify-center"
        >
          {isSubmitting ? 'Loading....' : 'Signup'}
        </button>

        <div className="text-md text-white mt-1">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
