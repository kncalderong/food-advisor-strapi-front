import { DishDataType } from '@/types/data/Restaurant.d'
import Image from 'next/image'
import React from 'react'

const DishCard = ({ data }: { data: DishDataType }) => {
  function handleAddItem() {
    // will add some logic here
  }

  return (
    <div className='w-full md:w-1/2 lg:w-1/3 p-4'>
      <div className='h-full bg-gray-100 rounded-2xl'>
        <Image
          className='w-full rounded-2xl'
          height={300}
          width={300}
          src={`${process.env.STRAPI_URL || 'http://127.0.0.1:1337'}${
            data.attributes.image.data.attributes.url
          }`}
          alt=''
        />
        <div className='p-8'>
          <div className='group inline-block mb-4'>
            <h3 className='font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black'>
              {data.attributes.name}
            </h3>
            <h2>${data.attributes.price}</h2>
          </div>
          <p className='text-sm text-gray-500 font-bold'>
            {data.attributes.description}
          </p>
          <div className='flex flex-wrap md:justify-center -m-2'>
            <div className='w-full md:w-auto p-2 my-6'>
              <button
                className='block w-full px-12 py-3.5 text-lg text-center text-white font-bold bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 rounded-full'
                onClick={handleAddItem}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DishCard
