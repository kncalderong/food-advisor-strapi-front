'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/context/appContext'
import CartItem from './CartItem'

const Cart = () => {
  const router = useRouter()
  const { user, cart, showCart, toggleShowCart } = useAppContext()
  const total = cart.total
  const displayTotal = Math.abs(total).toFixed(2)

  function loginRedirect() {
    router.push('/login')
  }

  function cartRedirect() {
    toggleShowCart(false)
    router.push('/checkout')
  }
  return (
    <section className='fixed right-20 top-[242px]'>
      <div className='relative'>
        <button
          onClick={() => toggleShowCart(!showCart)}
          className='absolute right-0 z-10 bg-green-500 text-white p-3 rounded-full hover:bg-yellow-500 items-center'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 16 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.3334 8.16667V4.83333C11.3334 2.99238 9.84099 1.5 8.00004 1.5C6.15909 1.5 4.66671 2.99238 4.66671 4.83333V8.16667M2.16671 6.5H13.8334L14.6667 16.5H1.33337L2.16671 6.5Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
          </svg>
        </button>
        {showCart && (
          <div className='rounded-3xl co bg-gray-800'>
            <div className='max-w-lg pt-6 pb-8 px-8 mx-auto'>
              <div className='flex mb-10 items-center justify-between'>
                <h6 className='font-bold text-2xl text-white mb-0'>
                  Your Cart
                </h6>
              </div>

              <div>
                {cart.items &&
                  cart.items.map((item, index) => {
                    if (item.quantity > 0) {
                      return <CartItem key={index} data={item} />
                    }
                  })}
              </div>
              <div className='p-6'>
                <div className='flex mb-6 content-center justify-between'>
                  <span className='font-bold text-white'>Order total</span>
                  <span className='text-sm font-bold text-white'>
                    ${displayTotal}
                  </span>
                </div>
                <button
                  onClick={() => (user ? cartRedirect() : loginRedirect())}
                  className='inline-block w-full px-6 py-3 text-center font-bold text-white bg-green-500 hover:bg-green-600 transition duration-200 rounded-full'
                >
                  {user ? 'Continue To Pay' : 'Login to Order'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart
