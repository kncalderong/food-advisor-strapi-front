'use client'

import { useAppContext } from '@/context/appContext'
import { ItemDataType } from '@/types/data/Restaurant'
import React from 'react'

const CheckoutCartItem = ({ data }: { data: ItemDataType }) => {
  const { addItem, removeItem } = useAppContext()
  const { quantity, attributes } = data
  return (
    <div className='p-6 flex flex-wrap justify-between border-b border-blueGray-800'>
      <div className='w-2/4'>
        <div className='flex flex-col h-full'>
          <h6 className='font-bold text-white mb-1'>{attributes.name}</h6>
          <span className='block pb-4 mb-auto font-medium text-gray-400'>
            {quantity} x ${attributes.price}
          </span>
        </div>
      </div>
      <div className='w-1/4'>
        <div className='flex flex-col items-end h-full'>
          <div className='flex justify-between'>
            <button
              className='mr-2 inline-block mb-auto font-medium text-sm text-gray-400 hover:text-gray-200'
              onClick={() => removeItem(data)}
            >
              Remove
            </button>
            <button
              className='inline-block mb-auto font-medium text-sm text-gray-400 hover:text-gray-200'
              onClick={() => addItem(data)}
            >
              Add
            </button>
          </div>
          <span className='block mt-2 text-sm font-bold text-white'>
            ${attributes.price * quantity}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutCartItem
