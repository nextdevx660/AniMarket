import React, { useContext, useState } from 'react'
import { CartContext } from '../_context/CartContext';
import ProductEditableOption from './ProductEditableOption';
import { Loader2Icon, MoreVerticalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function AddToCartBtn({editable, product, user}) {
          const { cart, setCart } = useContext(CartContext)
          const [loading, setLoading] = useState(false)


          const AddToCart = async () => {
                    const email = user?.primaryEmailAddress?.emailAddress;
                    const productId = product?.id;

                    if (!email || !productId) {
                              console.error('Missing email or productId', { email, productId });
                              return;
                    }

                    try {
                              setLoading(true);
                              console.log('Sending AddToCart request with:', { email, productId });

                              const res = await axios.post('/api/cart', {
                                        email,
                                        productId
                              });
                              setCart(cart => [...cart, product])
                              console.log('AddToCart response:', res.data.data[0]);
                    } catch (error) {
                              console.error('AddToCart error:', error.response?.data || error.message);
                              setLoading(false);
                    } finally {
                              setLoading(false);
                    }
          };
          return (
                    <div>
                              {editable ? <ProductEditableOption product={product}>
                                        <MoreVerticalIcon className='text-gray-600 w-5' />
                              </ProductEditableOption> :
                                        <Button size={'sm'} onClick={AddToCart} disabled={loading}>
                                                  {
                                                            loading ? <Loader2Icon className='animate-spin' /> : 'Add Cart'
                                                  }
                                        </Button>}
                    </div>
          )
}
