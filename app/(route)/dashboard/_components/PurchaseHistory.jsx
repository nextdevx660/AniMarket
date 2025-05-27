'use client'


import DisplayProductList from '@/app/_components/DisplayProductList';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function PurchaseHistory() {
          const [productList, setProductList] = useState([])

          useEffect(() => {
                    GetPurchaseHIstory();
          }, [])

          const GetPurchaseHIstory = async () => {
                    const result = await axios.get('/api/order');
                    setProductList(result.data);
          }
  return (
    <div>
          <h2 className='font-bold text-2xl'>Purchase History</h2>

          <DisplayProductList productList={productList}
                    purchase={true}
          />
    </div>
  )
}
