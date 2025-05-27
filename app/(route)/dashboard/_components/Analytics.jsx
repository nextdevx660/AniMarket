'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Analytics() {
          const [users, setUsers] = useState([])
          const [products, setProducts] = useState([])
          const [orders, setOrders] = useState([])
          const [loading, setLoading] = useState(true)

          useEffect(() => {
                    const fetchAnalytics = async () => {
                              try {
                                        const res = await axios.get('/api/analytics')
                                        const data = res.data

                                        // Extract users, products, orders into flat arrays
                                        const usersArray = data.map((item) => item.users)
                                        const productsArray = data.map((item) => item.products)
                                        const ordersArray = data.map((item) => item.orders)

                                        setUsers(usersArray)
                                        setProducts(productsArray)
                                        setOrders(ordersArray)
                                        setLoading(false)
                              } catch (error) {
                                        console.error('Error fetching analytics:', error)
                                        setLoading(false)
                              }
                    }

                    fetchAnalytics()
          }, [])

          if (loading) {
                    return <div className="p-5">Loading...</div>
          }

          return (
                    <div className="p-5">
                              <h2 className="text-3xl font-bold mb-5">📊 Analytics Dashboard</h2>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                                        {/* Products */}
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                                  <h3 className="text-xl font-semibold mb-3">🖼️ Products ({products.length})</h3>
                                                  <div className="space-y-3 max-h-64 overflow-y-auto">
                                                            {products.map((product, i) => (
                                                                      <div key={i} className="flex items-center gap-3 border-b pb-2">
                                                                                <img src={product.imageUrl} alt={product.title} className="w-12 h-12 rounded object-cover" />
                                                                                <div>
                                                                                          <p className="font-medium">{product.title}</p>
                                                                                          <p className="text-sm text-gray-500">₹{product.price}</p>
                                                                                          <p className="text-xs text-gray-400">{product.category}</p>
                                                                                </div>
                                                                      </div>
                                                            ))}
                                                  </div>
                                        </div>

                                        {/* Orders */}
                                        <div className="bg-white p-4 rounded-lg shadow-md">
                                                  <h3 className="text-xl font-semibold mb-3">🛒 Orders ({orders.length})</h3>
                                                  <div className="space-y-3 max-h-64 overflow-y-auto">
                                                            {orders.map((order, i) => (
                                                                      <div key={i} className="border-b pb-2">
                                                                                <p className="font-medium">Order ID: {order.id}</p>
                                                                                <p className="text-sm text-gray-500">By: {order.email}</p>
                                                                                <p className="text-xs text-gray-400">Product ID: {order.productId}</p>
                                                                      </div>
                                                            ))}
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
