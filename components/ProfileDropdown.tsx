'use client'

import { FaUserCircle } from 'react-icons/fa'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LuUser, LuChartColumnBig } from 'react-icons/lu'
import Link from 'next/link'
import Image from 'next/image'

const ProfileDropdown = ({user}:{user:any}) => {
  if (!user) return null

  const pfp = user.image

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className={'outline-none focus:outline-none'}>
        {pfp ? (
          <Image
            src={pfp}
            alt='profile'
            width={36}
            height={36}
            className="rounded-full object-cover cursor-pointer"
            priority
          />
        ) : (
          <FaUserCircle className="text-white w-9 h-9 cursor-pointer" />
        )}
      </MenuButton>

      <MenuItems className="absolute right-0 mt-1 w-40 p-2 origin-top-right bg-[#1f1f1f] border border-[#333] divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="px-1 py-1 flex flex-col text-white">
          <MenuItem>
            {() => (
              <Link
                href={'/profile'}
                className="text-white flex items-center gap-1.5 hover:bg-[#2f2f2f] hover:rounded-xl px-4 py-2 text-left cursor-pointer"
              >
                <LuUser />
                Profile
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {() => (
              <Link
                href={'/userBlogs'}
                className="text-white flex items-center gap-1.5 hover:bg-[#2f2f2f] hover:rounded-xl px-4 py-2 text-left cursor-pointer"
              >
                <LuChartColumnBig />
                Your Blogs
              </Link>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}

export default ProfileDropdown