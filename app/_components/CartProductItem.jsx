import { Badge } from '@/components/ui/badge'
import axios from 'axios'
import { Trash, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import { toast } from 'sonner'
import { CartContext } from '../_context/CartContext'
import RemoveFromCart from './RemoveFromCart'

export default function CartProductItem({ product }) {
          const { cart, setCart } = useContext(CartContext)
          // const handleRemoveFromCart = async () => {
          //           const cartList = cart.filter((item) => item.id !== product?.id)
          //           setCart(cartList)
          //           const result = await axios.delete('api/cart?recordId=' + product?.id)
          //           toast('Product Removed From the Cart')
          // }
          return (
                    <div className='flex items-center justify-between gap-5 w-full'>
                              <Image src={product?.imageUrl} alt={product?.title} width={100} height={100} className='rounded-xl shadow-md mt-2 w-[70px] h-[70px] object-cover' />
                              <div className='flex flex-col items-start justify-start'>
                                        <h2 className='font-bold text-black text-left'>{product?.title}</h2>
                                        <h3 className='font-bold text-anime-purple text-sm rounded-xl'>${product?.price}</h3>
                              </div>
                              {/* <Trash2Icon className='text-red-600' onClick={handleRemoveFromCart} /> */}
                              <RemoveFromCart product={product}/>
                    </div>
          )
}
