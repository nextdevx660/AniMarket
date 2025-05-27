import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { MoreVerticalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button' // Assuming you have a Button component

export default function SimilarProduct({ category, currentProductId }) {
          const [similarProducts, setSimilarProducts] = useState([])

          useEffect(() => {
                    if (category) {
                              getSimilarProducts()
                    }
          }, [category])

          const getSimilarProducts = async () => {
                    try {
                              const res = await axios.get(`/api/products?category=${category}`)
                              const filtered = res.data.filter(item => item.id !== currentProductId)
                              setSimilarProducts(filtered)
                    } catch (error) {
                              console.error('Error fetching similar products:', error)
                    }
          }

          return (
                    <div className='mt-10'>
                              <h2 className='font-bold text-2xl text-gray-700 mb-3'>Similar Products</h2>

                              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
                                        {similarProducts.length > 0 ? (
                                                  similarProducts.map((product, index) => (
                                                            <Link href={`/explore/${product.id}`} key={index}>
                                                                      <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-sm">

                                                                                {/* Image Section */}
                                                                                <div className="relative w-full h-64">
                                                                                          <Image
                                                                                                    src={product.imageUrl}
                                                                                                    alt={product.title}
                                                                                                    layout="fill"
                                                                                                    objectFit="cover"
                                                                                                    className="rounded-t-xl"
                                                                                          />
                                                                                </div>

                                                                                {/* Details Section */}
                                                                                <div className="p-4">
                                                                                          <h3 className="text-lg font-semibold text-anime-dark">
                                                                                                    {product.title}
                                                                                          </h3>

                                                                                          <div className='flex items-center justify-start gap-2 mt-2'>
                                                                                                    {product.user && (
                                                                                                              <>
                                                                                                                        <Image
                                                                                                                                  src={product.user.image}
                                                                                                                                  alt={product.user.name}
                                                                                                                                  width={24}
                                                                                                                                  height={24}
                                                                                                                                  className='rounded-full'
                                                                                                                        />
                                                                                                                        <p className="text-sm text-anime-dark/70">
                                                                                                                                  <Link href={`/profile/${product.user.id}`} className="text-anime-purple hover:underline">
                                                                                                                                            {product.user.name}
                                                                                                                                  </Link>
                                                                                                                        </p>
                                                                                                              </>
                                                                                                    )}
                                                                                          </div>

                                                                                          <div className="mt-4 flex items-center justify-between">
                                                                                                    <span className="text-2xl font-bold text-anime-dark">${product.price}</span>
                                                                                                    <h2 className='text-xl font-bold text-anime-purple hover:underline'>Visit</h2>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </Link>
                                                  ))
                                        ) : (
                                                  <p className='text-gray-500'>No similar products found.</p>
                                        )}
                              </div>
                    </div>
          )
}
