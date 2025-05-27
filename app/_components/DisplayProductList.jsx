import React from 'react'
import ProductCardItem from './ProductCardItem'
import { useUser } from '@clerk/nextjs'

export default function DisplayProductList({productList, purchase = false}) {
          const {user} = useUser()
          return (
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-8'>
                              {
                                        productList.length > 0 ?
                                                  productList.map((product, index) => (
                                                            <ProductCardItem product={product} key={index} user={user} purchase={purchase}/>
                                                  )) :
                                                  [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                                                            <div className='bg-slate-200 h-[300px] w-full animate-pulse rounded-lg' key={index}>

                                                            </div>
                                                  ))
                              }
                    </div>
          )
}
