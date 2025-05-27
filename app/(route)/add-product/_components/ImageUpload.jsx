
'use client'


import { FileImage } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function ImageUpload({onImageSelect}) {
          const [image, setImage] = useState()
          const handleFileChange = (e) => {
                    const file = e.target.files[0]
                    onImageSelect(e)
                    const render = new FileReader();
                    render.onloadend = () => {
                              setImage(render.result)
                    }
                    render.readAsDataURL(file)
          }
          return (
                    <div>
                              <h2 className='text-gray-600 font-bold mb-2'>Upload Product Preview Image</h2>
                              <input type='file' id='imageUpload' name='image' className='hidden'
                                        onChange={handleFileChange}
                              />
                              <label htmlFor="imageUpload">
                                        <div className='p-8 flex flex-col justify-center items-center cursor-pointer border-dashed border-2 border-black rounded-md bg-slate-100 gap-1'>
                                                  {
                                                            image ? <Image src={image} alt='preview' width={300} height={300} className='object-contain h-[200px]' /> :
                                                                      <div className='flex flex-col items-center justify-center'>
                                                                                <FileImage className='w-10 text-gray-600 text-2xl' />
                                                                                <h2 className='text-gray-500 font-bold text-xl'>Upload Product Preview Image</h2>
                                                                                <p className='text-sm text-gray-500'>Click or Drag & Drop to Upload</p>
                                                                      </div>
                                                  }

                                        </div>
                              </label>
                    </div>
          )
}
