'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Products from '../_mockData/Products'
import ProductCardItem from './ProductCardItem'
import axios from 'axios'
import Link from 'next/link'
import DisplayProductList from './DisplayProductList'

export default function ProductList() {
          const [productList, setProductList] = useState([])

          useEffect(() => {
                    // setProductList(Products)
                    GetProductList()
          }, [])

          const GetProductList = async () => {
                    const result = await axios.get('/api/products?limit=4')
                    console.log(result.data);
                    setProductList(result.data)
          }

          return (
                    <div>
                              <div className='flex items-center justify-between'>
                                        <h2 className='font-bold text-2xl text-gray-600'>Products</h2>
                                        <span>
                                                  <Link href={'/explore'}>
                                                            <Button size={'sm'}>View All</Button>
                                                  </Link>
                                        </span>
                              </div>
                             <DisplayProductList productList={productList}/>
                    </div>
          )
}
