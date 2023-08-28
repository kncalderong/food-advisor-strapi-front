'use client'

import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import CheckoutCart from '@/components/checkout/CheckoutCart'
const stripePromise = loadStripe(
  'pk_test_51Nk7ceHqjzfHHAOrAXo2kxwhSKdI1NSJ3UCGLauqNLlkbmQ6oolMSlswojtNU31wq881QmIblTXdRXLFu6YJCWbd00RonkaDVK'
)

const Page = () => {
  return (
    <section className='container mx-auto py-24'>
      <div className='grid grid-cols-5 gap-4'>
        <div className='col-span-2'>
          <CheckoutCart />
        </div>
        <div className='col-span-3'>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </section>
  )
}

export default Page
