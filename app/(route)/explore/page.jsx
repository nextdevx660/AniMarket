'use client';

import DisplayProductList from '@/app/_components/DisplayProductList';
import SortProduct from '@/app/_components/SortProduct';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Explore() {
  const [productList, setProductList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState({
    label: 'NEWEST',
    id: 'id',
    order: 'desc'
  })

  const limit = 3;

  useEffect(() => {
    fetchProductList(0, '');
  }, []);


  useEffect(() => {
    if (sort) {
      setProductList([])
      fetchProductList(0, '')
    }
  }, [sort])



  const fetchProductList = async (offset_, searchText_) => {
    try {
      setLoading(true);

      const trimmedSearch = searchText_.trim();
      const result = await axios.post('/api/all-products', {
        limit,
        offset: offset_,
        searchText: trimmedSearch,
        sort: sort ?? []
      });

      const data = result.data || [];

      if (offset_ === 0) {
        setProductList(data);
      } else {
        setProductList((prev) => [...prev, ...data]);
      }

      setOffset(offset_);
      setHasMore(data.length === limit); // If less than limit, no more data
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProductList(0, searchInput);
  };

  const handleLoadMore = () => {
    fetchProductList(offset + limit, searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-2xl text-gray-700'>Explore</h2>
      <div className='mt-5 flex items-start justify-between flex-col md:flex-row gap-5'>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-[100%] md:w-[80%] lg:w-[60%] xl:w-[40%]"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div>
          <SortProduct onSortChange={(value) => setSort(value)} />
        </div>
      </div>



      <DisplayProductList productList={productList} />

      <div className='flex items-center justify-center mt-10'>
        {hasMore && !loading && (
          <Button size='sm' onClick={handleLoadMore}>
            Load More
          </Button>
        )}
        {loading && offset !== 0 && (
          <p className="text-gray-500">Loading more products...</p>
        )}
      </div>
    </div>
  );
}
