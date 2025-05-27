'use client'

import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
          Select,
          SelectContent,
          SelectItem,
          SelectTrigger,
          SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import ImageUpload from './_components/ImageUpload'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


export default function AddProduct() {
          const categories = [
                    'Anime Wallpapers',
                    'Fonts',
                    'Anime T-shirt Designs',
                    'Illustrates',
                    'Manga',
                    'Audio',
                    'Anime Clips',
                    'Backgrounds',
                    'Anime Logos'
          ]

          const [formData, setFormData] = useState([])
          const { user } = useUser()
          const [loading, setLoading] = useState(false)
          const router = useRouter()

          
          useEffect(() => {
                    if (user?.primaryEmailAddress?.emailAddress) {
                              setFormData(prev => ({
                                        ...prev,
                                        userEmail: user.primaryEmailAddress.emailAddress
                              }))
                    }
          }, [user])


          const handleInputChange = (fieldName, fieldValue) => {
                    setFormData(prev => ({
                              ...prev,
                              [fieldName]: fieldValue
                    }))
                    console.log(formData);

          }

          const onAddProductBtnClick = async () => {
                    setLoading(true)
                    const formDataObj = new FormData()
                    formDataObj.append('image', formData.image)
                    formDataObj.append('file', formData.File)
                    formDataObj.append('data', JSON.stringify(formData))

                    const result = await axios.post('/api/products', formDataObj, {
                              headers: {
                                        'Content-Type': 'multiport/form-data'
                              }
                    })
                    setLoading(false)

                    if (result) {
                              toast('Product is added succesfully')
                              router.push('/dashboard')
                    }
          }

          return (
                    <div className='mt-10'>
                              <h2 className='font-bold text-2xl text-gray-700'>Add New Product</h2>
                              <p className='text-sm text-gray-500'>Start Selling and Earn your first Income</p>

                              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
                                        <div>
                                                  <ImageUpload onImageSelect={(e) => handleInputChange(e.target.name, e.target.files[0])} />
                                                  <div>
                                                            <h4 className='text-sm text-gray-400 mt-5'>Upload File which you want to Sell</h4>
                                                            <Input type='file'
                                                                      onChange={(e) => handleInputChange('File', e.target.files[0])}
                                                            />
                                                  </div>
                                                  <div>
                                                            <h2 className='text-sm text-gray-400 mt-5'>Message to User</h2>
                                                            <Textarea name='message' placeholder='Write Greeting for the user'
                                                                      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                            />
                                                  </div>
                                        </div>
                                        <div className='flex flex-col gap-5 w-full'>
                                                  <div>
                                                            <h4 className='text-gray-400 text-sm'>Product Title</h4>
                                                            <Input name='title' placeholder='eg. Makima Sexy Wallpaper.'
                                                                      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                            />
                                                  </div>
                                                  <div>
                                                            <h4 className='text-gray-400 text-sm'>Price</h4>
                                                            <Input type={'number'} name='price' placeholder='eg. $99'
                                                                      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                            />
                                                  </div>
                                                  <div>
                                                            <h4 className='text-gray-400 text-sm'>Category</h4>
                                                            <Select onValueChange={(value) => handleInputChange('category', value)}>
                                                                      <SelectTrigger className="w-[180px]">
                                                                                <SelectValue placeholder="Categories" />
                                                                      </SelectTrigger>
                                                                      <SelectContent>
                                                                                {
                                                                                          categories.map((category, index) => (
                                                                                                    <SelectItem value={category} key={index}>{category}</SelectItem>
                                                                                          ))
                                                                                }
                                                                      </SelectContent>
                                                            </Select>
                                                  </div>
                                                  <div>
                                                            <h4 className='text-gray-400 text-sm'>Description</h4>
                                                            <Textarea name='description' placeholder='eg. Makima is a Famaous character of Chainsaw Man and it is the wallpaper of her sexy pose.'
                                                                      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                            />
                                                  </div>
                                                  <div>
                                                            <h4 className='text-gray-400 text-sm'>About Product (Optional)</h4>
                                                            <Textarea name='about' placeholder='About the Product'
                                                                      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                            />
                                                  </div>
                                                  <Button onClick={onAddProductBtnClick} disabled={loading}>
                                                            {
                                                                      loading ? <Loader2Icon className='animate-spin w-5 text-white' /> : 'Add Product'
                                                            }
                                                  </Button>
                                        </div>
                              </div>

                    </div>
          )
}
