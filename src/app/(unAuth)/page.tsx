import Image from "next/image";
import Link from 'next/link';


export default function Home() {
  return (
    <div className='bg-black h-full flex items-center justify-center text-white'>
      <div className='flex flex-col gap-7 ml-5 p-15'>
        <h1 className='text-5xl font-bold'>
          Explore Ideas, Discover Depth & Share your views.
        </h1>
        <div className="text-xl font-sans leading-relaxed">
          Where thoughts meet clarity — DeepView is your gateway to insightful perspectives, untold stories, and deeper understanding beyond the surface.            
        </div>
        <div className="flex gap-4">
            <Link href="/login" className="flex-1">
              <button className="w-full bg-white text-black h-11 rounded-2xl cursor-pointer hover:bg-[#ffffffc4] leading-relaxed">
                Get started
              </button>
            </Link>

            <Link href="/about" className="flex-1">
              <button className="w-full border-2 border-[#2a2a2a] h-11 rounded-2xl cursor-pointer hover:bg-[#111111ce] leading-relaxed">
                Learn more
              </button>
            </Link>
        </div>
      </div>
      <Image src="/telecommuting-illustration.png" alt="man thinking" width={500} height={100} className="mr-8" priority></Image>
   </div>
  );
}
