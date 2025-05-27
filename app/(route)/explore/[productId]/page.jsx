'use client'

import axios from 'axios'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import {
          Accordion,
          AccordionContent,
          AccordionItem,
          AccordionTrigger,
} from "@/components/ui/accordion"
import SimilarProduct from './_components/SimilarProduct'
import { useUser } from '@clerk/nextjs'
import AddToCartBtn from '@/app/_components/AddToCartBtn'


export default function ProductDetailt() {
          const { user } = useUser()
          const { productId } = useParams()
          const [productDetail, seProductDetail] = useState()
          useEffect(() => {
                    GetProductDetailt()
          }, [])

          const GetProductDetailt = async () => {
                    const result = await axios.get('/api/products?id=' + productId)
                    console.log(result.data);
                    seProductDetail(result.data)
          }


          const AddToCart = async () => {
                    const email = user?.primaryEmailAddress?.emailAddress;
                    // const productId = productId;

                    if (!email || !productId) {
                              console.error('Missing email or productId', { email, productId });
                              return;
                    }

                    try {
                              console.log('Sending AddToCart request with:', { email, productId });

                              const res = await axios.post('/api/cart', {
                                        email,
                                        productId
                              });

                              console.log('AddToCart response:', res.data.data[0]);
                    } catch (error) {
                              console.error('AddToCart error:', error.response?.data || error.message);
                    }
          };


          return (
                    <div className='mt-5'>
                              <Link href={'/explore'}>
                                        <div className='flex items-center justify-start gap-1'>
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                                                  <h2 className='text-xl font-bold text-gray-700'>Back</h2>
                                        </div>
                              </Link>

                              <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-10'>
                                        <div className='flex items-center justify-center'>
                                                  {
                                                            productDetail &&
                                                            <Image src={productDetail.imageUrl} alt={productDetail?.title} width={400} height={400} className='w-[360px] h-[400px] shadow-xl' />
                                                  }
                                        </div>
                                        <div>
                                                  <div>
                                                            <h2 className='font-bold text-3xl'>{productDetail?.title}</h2>
                                                            <Badge className={'bg-anime-purple text-white rounded-xl mt-3'}>{productDetail?.category}</Badge>
                                                  </div>
                                                  <h1 className='text-3xl font-bold mt-5 text-anime-blue'>${productDetail?.price}</h1>
                                                  <p className='mt-3 text-slate-500 '>The {productDetail?.category} will send to your registered email address once you purchase this degital product.</p>
                                                  {/* <Button className='flex items-center justify-start gap-3 mt-3' onClick={AddToCart}> <ShoppingCart /> Add Cart</Button> */}
                                                  <AddToCartBtn product={productDetail} user={user}/>
                                                  <Accordion type="single" collapsible className='border mt-5 px-2'>
                                                            <AccordionItem value="item-1">
                                                                      <AccordionTrigger>Deascription</AccordionTrigger>
                                                                      <AccordionContent className='text-slate-600'>
                                                                                {productDetail?.description}
                                                                      </AccordionContent>
                                                            </AccordionItem>
                                                            <AccordionItem value="item-2">
                                                                      <AccordionTrigger>About</AccordionTrigger>
                                                                      <AccordionContent className='text-slate-600'>
                                                                                {productDetail?.about}
                                                                      </AccordionContent>
                                                            </AccordionItem>
                                                  </Accordion>

                                        </div>
                              </div>


                              <div className='mt-5'>
                                        <SimilarProduct category={productDetail?.category} currentProductId={productDetail?.id} />
                              </div>

                    </div>
          )
}
