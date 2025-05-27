import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import UserListing from './_components/UserListing'
import PurchaseHistory from './_components/PurchaseHistory'
import Analytics from './_components/Analytics'

export default function Dashboard() {
          return (
                    <div className='mt-3'>
                              <h2 className='font-bold text-2xl text-gray-600'>Dahboard</h2>
                              <Tabs defaultValue="listing" className='mt-5'>
                                        <TabsList>
                                                  <TabsTrigger value="listing">Listing</TabsTrigger>
                                                  <TabsTrigger value="purchase">Purchase</TabsTrigger>
                                                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="listing"><UserListing /></TabsContent>
                                        <TabsContent value="purchase">
                                                  <PurchaseHistory />
                                        </TabsContent>
                                        <TabsContent value="analytics">
                                                 <Analytics />
                                        </TabsContent>
                              </Tabs>

                    </div>
          )
}
