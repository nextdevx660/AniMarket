'use client'

import CheckoutProduct from '@/app/_components/CheckoutProduct'
import { CartContext } from '@/app/_context/CartContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function Checkout() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const email = user?.primaryEmailAddress?.emailAddress
  const { cart, setCart } = useContext(CartContext)


  const onPaymentSuccess = async () => {
    // console.log('Payment successful');
    setLoading(true)
    const result = await axios.post('/api/order', {
      orderDetail: cart,
      email: user?.primaryEmailAddress?.emailAddress
    })

    if (result) {
      setCart([]) // Clear the cart after successful order
      toast('Order placed successfully! Your order will be delivered to your registered email address.')
    }
    setLoading(false)
    router.replace('/dashboard')

    console.log(result.data);

  }

  return (
    <div>
      <h2 className='text-2xl font-bold mt-5'>Checkout</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
        <div className='flex flex-col gap-3'>
          {
            cart.map((product, index) => (
              <CheckoutProduct key={index} product={product} />
            ))
          }
        </div>
        <div>
          <div className='bg-white p-5 rounded-lg shadow-md'>
            <h2 className='text-xl font-bold mb-3'>Order Summary</h2>
            <p className='text-md text-gray-500 mb-3'>You have {cart.length} items in your cart.</p>
            <div className='flex justify-between items-center mb-3'>
              <span className='text-lg font-semibold'>Total:</span>
              <span className='text-lg font-semibold'>${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
            </div>
            {/* <button className='w-full bg-anime-purple text-white py-2 rounded-lg hover:bg-anime-purple-dark transition duration-300'>Proceed to Payment</button> */}
            <PayPalButtons style={{ layout: "horizontal" }}
              onApprove={() => onPaymentSuccess()}
              onCancel={() => toast('Payment Cancelled')}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: cart.reduce((total, item) => total + item.price, 0).toFixed(2),
                      currency_code: 'USD'
                    }
                  }]
                })
              }}
            />
            <hr className='mt-5 mb-5' />
            <div>
              <p className='text-gray-500 text-sm'>Your payment reciept and product will be delivered to your registered email address: <Badge asChild className={'bg-anime-purple hover:bg-anime-purple'}>{email}</Badge></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
