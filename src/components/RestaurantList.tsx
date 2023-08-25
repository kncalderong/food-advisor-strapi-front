'use client'

import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Loader from './Loader'
import RestaurantCard from './RestaurantCard'
import { RestaurantDataType } from '@/types/data/Restaurant'

const QUERY = gql`
  {
    restaurants {
      data {
        id
        attributes {
          name
          description
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
`

const RestaurantList = ({ query }: { query: string }) => {
  const { loading, error, data } = useQuery(QUERY)

  if (error) return 'Error loading restaurants'
  if (loading) return <Loader />

  if (data.restaurants.data && data.restaurants.data.length) {
    const searchQuery = data.restaurants.data.filter(
      (restaurant: RestaurantDataType) =>
        restaurant.attributes.name.toLowerCase().includes(query.toLowerCase())
    )

    if (searchQuery.length != 0) {
      return (
        <div className='py-16 px-8 bg-white rounded-3xl'>
          <div className='max-w-7xl mx-auto'>
            <div className='flex flex-wrap -m-4 mb-6'>
              {searchQuery.map((restaurant: RestaurantDataType) => {
                return <RestaurantCard key={restaurant.id} data={restaurant} />
              })}
            </div>
          </div>
        </div>
      )
    } else {
      return <h1>No Restaurants Found</h1>
    }
  }
  return <h5>Add Restaurants</h5>
}

export default RestaurantList
