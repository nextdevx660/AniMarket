'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import { Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { use, useContext } from 'react';
import { CartContext } from '../_context/CartContext';
import CartList from './CartList';

export default function Header() {
  const { user } = useUser()
  const { cart, setCart } = useContext(CartContext)
  return (
    <div className="mx-auto px-4 py-3 flex items-center justify-between w-screen border-b bg-white shadow-sm">
      {/* Left - Logo */}
      <Link href="/" className="text-xl font-bold text-gray-900 flex items-center space-x-2">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-anime-purple via-anime-blue to-anime-pink" />
        <span className="font-extrabold">AniMarket</span>
      </Link>


      {/* Center - Navigation */}
      <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
        <Link href="/" className='hover:text-anime-purple'>All Products</Link>
        <Link href="/explore" className='hover:text-anime-purple'>Categories</Link>
      </nav>

      {/* Right - Search and Icons */}
      <div className="flex items-center space-x-4">
        <CartList>
          <div className='flex items-center gap-2 relative mr-0 md:mr-2'>
            <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-anime-purple" />
            <Badge className={'bg-anime-purple rounded-full w-4 flex items-center justify-center font-bold hover:bg-anime-purple absolute bottom-[70%] left-[70%]'}>{cart.length}</Badge>
          </div>
        </CartList>
        <Link href={'/dashboard'}>
          <Button size={'sm'} className='hidden md:block'>Start Selling</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}
