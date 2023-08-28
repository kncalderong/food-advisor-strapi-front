'use client'

import { useAppContext } from '@/context/appContext'
import React from 'react'
import CheckoutCartItem from './CheckoutCartItem'

const CheckoutCart = () => {
  const { cart } = useAppContext()
  const total = cart.total
  const displayTotal = Math.abs(total).toFixed(2)

  return (
    <div className='rounded-2xl co bg-gray-800'>
      <div className='max-w-lg pt-6 pb-8 px-8 mx-auto bg-blueGray-900'>
        <div className='flex mb-10 items-center justify-between'>
          <h6 className='font-bold text-2xl text-white mb-0'>Your Cart</h6>
        </div>

        <div>
          {cart.items &&
            cart.items.map((item, index) => {
              if (item.quantity > 0) {
                return <CheckoutCartItem key={index} data={item} />
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
        </div>
      </div>
    </div>
  )
}

export default CheckoutCart
