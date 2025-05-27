import React, { useContext } from 'react'
import {
          Sheet,
          SheetContent,
          SheetDescription,
          SheetHeader,
          SheetTitle,
          SheetTrigger,
} from "@/components/ui/sheet"
import { CartContext } from '../_context/CartContext'
import CartProductItem from './CartProductItem'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function CartList({ children }) {
          const { cart, setCart } = useContext(CartContext)

          const calculateTotalAmount = () => {
                    let total = 0;
                    cart.forEach(product => {
                              total += product.price;
                    });
                    return total.toFixed(2); // Return total amount formatted to 2 decimal places
          }

          return (
                    <Sheet>
                              <SheetTrigger>
                                        {children}
                              </SheetTrigger>
                              <SheetContent>
                                        <SheetHeader>
                                                  <SheetTitle>Cart</SheetTitle>
                                                  <SheetDescription>
                                                            <div>
                                                                      <p>Your All Cart Items Listed Here</p>
                                                                      <div className='flex items-center flex-col gap-2 mt-5'>
                                                                                {
                                                                                          cart.map((product, index) => (
                                                                                                    <CartProductItem key={index} product={product} />
                                                                                          ))
                                                                                }
                                                                      </div>

                                                                      <div className='mt-5'>
                                                                                <h2>Total: <span>${calculateTotalAmount()}</span></h2>
                                                                                <Link href={'/checkout'}>
                                                                                          <Button className='w-full mt-3 bg-anime-purple hover:bg-anime-purple'>Checkout</Button>
                                                                                </Link>
                                                                      </div>

                                                            </div>
                                                  </SheetDescription>
                                        </SheetHeader>
                              </SheetContent>
                    </Sheet>

          )
}
