import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import RemoveFromCart from './RemoveFromCart'

export default function CheckoutProduct({ product }) {
          return (
                    <div className='border-b p-2'>
                              {
                                        product && (
                                                  <div className='flex items-center gap-5 mb-5'>
                                                            <Image src={product.imageUrl} alt={product.title} width={110} height={110} className='rounded-md shadow-lg object-cover w-[100px] h-[100px]' />
                                                            <div className='w-full'>
                                                                      <h2 className='text-lg font-semibold'>{product.title}</h2>
                                                                      <p className='text-md text-gray-500'>${product.price.toFixed(2)}</p>
                                                                      <h2 className='text-sm text-gray-500'>{product?.category}</h2>
                                                            </div>
                                                            <RemoveFromCart product={product}/>
                                                  </div>
                                        )
                              }
                    </div>
          )
}
