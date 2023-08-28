'use client'

import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Loader from '@/components/Loader'
import DishCard from '@/components/DishCard'
import { DishDataType } from '@/types/data/Restaurant'

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                price
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const Page = ({ params }: { params: { id: string } }) => {
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: params.id },
  })

  if (error) return 'Error Loading Dishes'
  if (loading) return <Loader />

  if (data.restaurant.data.attributes.dishes.data.length) {
    const { restaurant } = data
    return (
      <div className='py-6'>
        <h1 className='text-4xl font-bold text-green-600'>
          {restaurant.data.attributes.name}
        </h1>
        <div className='py-16 px-8 bg-white rounded-3xl'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex flex-wrap -m-4 mb-6'>
              {restaurant.data.attributes.dishes.data.map(
                (dish: DishDataType) => {
                  return <DishCard key={dish.id} data={dish} />
                }
              )}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <h1>No Dishes Found</h1>
  }
}

export default Page
