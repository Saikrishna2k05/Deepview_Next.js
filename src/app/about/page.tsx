import React from 'react'
import Link from 'next/link'


const About = () => {
  return (
    <div className='text-white ml-35 mr-35 mt-12 text-xl gap-6 flex flex-col bg-black'>
      <div className='flex-1 leading-relaxed'>
        At <b>Deepview</b>, we believe that meaningful ideas deserve a space where they can be explored, expressed, and elevated. Our platform is built for curious minds — a place where readers find depth in every scroll, and writers share insights that go beyond the surface.
      </div>
      <div  className='flex-1 leading-relaxed'>
        Whether you're a storyteller, a thinker, or a seeker of knowledge, DeepView invites you to:
      </div>
      <ul className='flex flex-col gap-2 list-disc pl-6'>
        <li><b>✍️ Write</b> with purpose</li>
        <li><b>📖 Read</b> with intent</li>
        <li><b>🔍 Engage</b> with depth</li>
      </ul>
      <div  className='flex-1 leading-relaxed'>
        We’re more than a blogging platform — we’re a movement for deeper perspectives, thoughtful conversations.
      </div>
      <div>
        <Link href='/login' className='text-blue-400 underline'>Join us</Link>, and dive beneath the surface.
      </div>
    </div>
  )
}

export default About
