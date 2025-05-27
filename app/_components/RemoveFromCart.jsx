'use client'


import React, { useContext } from 'react'
import { CartContext } from '../_context/CartContext'
import axios from 'axios'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'

export default function RemoveFromCart({ product }) {
          const { cart, setCart } = useContext(CartContext)
          const handleRemoveFromCart = async () => {
                    const cartList = cart.filter((item) => item.id !== product?.id)
                    setCart(cartList)
                    const result = await axios.delete('api/cart?recordId=' + product?.id)
                    toast('Product Removed From the Cart')
          }
          return (
                    <div>
                              <Trash2Icon className='text-red-600 w-4' onClick={handleRemoveFromCart} />
                    </div>
          )
}


