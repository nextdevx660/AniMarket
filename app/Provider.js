'use client'

import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { CartContext } from './_context/CartContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function Provider({ children }) {
  const { user } = useUser()
  const [cart, setCart] = useState([])

  const checkIsUser = async () => {
    try {
      const result = await axios.post('/api/user', {
        user: user
      });
      console.log("🌟 API Response:", result.data);
    } catch (error) {
      console.error('Failed to verify user:', error);
    }
  };


  const GetCartDetails = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) {
        console.error('No email found for user');
        return;
      }
      const response = await axios.get('/api/cart?email=' + email);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart details:', error);
    }
  };


  useEffect(() => {
    if (user) {
      checkIsUser()
      GetCartDetails()
    }
  }, [user])

  return (
    <div>
      <CartContext.Provider value={{ cart, setCart }}>
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
          <Header />
          {children}
          <Footer />
        </PayPalScriptProvider>
      </CartContext.Provider>
    </div>
  )
}
