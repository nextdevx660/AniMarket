'use client'

import ProductCardItem from '@/app/_components/ProductCardItem'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { AlertOctagonIcon, AlertTriangleIcon, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function UserListing() {
        const [listing, setListing] = useState([])
        const { user } = useUser()
        const [loading, setLoading] = useState(false)

        useEffect(() => {
                if (user?.primaryEmailAddress?.emailAddress) {
                        console.log("User loaded:", user.primaryEmailAddress.emailAddress)
                        GetUserProductListing()
                }
        }, [user])


        const GetUserProductListing = async () => {
                try {
                        setLoading(true)
                        const email = user?.primaryEmailAddress?.emailAddress;
                        if (!email) return console.warn("No email found");

                        const result = await axios.get(`/api/products?email=${email}`);
                        setListing(result.data);
                } catch (error) {
                        console.error("Error fetching product listing:", error);
                        setLoading(false)
                } finally {
                        setLoading(false)
                }
        };





        return (
                <div className='mt-5'>
                        <div className='font-bold text-xl flex items-center justify-between gap-3'>
                                <h2>Listing</h2>
                                <Link href={'/add-product'}>
                                        <Button size={'sm'}><PlusCircle /> Add New Button</Button>
                                </Link>
                        </div>
                        <div>
                                {
                                        listing?.length == 0 &&
                                        <div className='flex items-center justify-center mt-10'>
                                                <h2 className='font-bold text-xl text-center flex items-center gap-3 text-gray-400'><AlertTriangleIcon className='text-yellow-500' /> No Listing Found</h2>
                                        </div>
                                }

                                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
                                        {
                                                listing.map((product, index) => (
                                                        <ProductCardItem product={product} key={index}
                                                                editable={true}
                                                        />
                                                ))
                                        }
                                </div>
                        </div>
                </div>
        )
}
