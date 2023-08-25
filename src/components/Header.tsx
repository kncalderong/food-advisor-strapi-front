'use client'

import { useAppContext } from '@/context/appContext'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const { user, logoutUser } = useAppContext()

  const handleLogout = () => {
    logoutUser()
    router.push('/')
  }

  return (
    <nav className='container mx-auto flex justify-between p-6 px-4'>
      <div className='flex justify-between items-center w-full'>
        <div className='xl:w-1/3'>
          <Link
            className='block text-lg max-w-max text-coolGray-500 hover:text-coolGray-900 font-medium'
            href='/'
          >
            Food Order App
          </Link>
        </div>

        <div className='xl:block xl:w-1/3'>
          <div className='flex items-center justify-end'>
            <Link
              className='text-coolGray-500 hover:text-coolGray-900 font-medium'
              href='/'
            >
              Home
            </Link>
            <div className='hxl:block'>
              {user ? (
                <div className='flex items-center justify-end'>
                  <span className='inline-block py-2 px-4 mr-2 leading-5 text-coolGray-500 hover:text-coolGray-900 bg-transparent font-medium rounded-md'>
                    {user.username}
                  </span>
                  <button
                    className='inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md'
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className='flex items-center justify-end'>
                  <Link
                    className='inline-block py-2 px-4 mr-2 leading-5 text-coolGray-500 hover:text-coolGray-900 font-bold bg-transparent rounded-md'
                    href='/login'
                  >
                    Log In
                  </Link>
                  <Link
                    className='inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-600 hover:bg-green-700 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md'
                    href='/register'
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
