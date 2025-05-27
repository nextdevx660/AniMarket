import { Button } from '@/components/ui/button';
import { Loader2Icon, MoreVerticalIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ProductEditableOption from './ProductEditableOption';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useContext, useState } from 'react';
import { CartContext } from '../_context/CartContext';
import { useRouter } from 'next/navigation';
import AddToCartBtn from './AddToCartBtn';

export default function ProductCardItem({ product, editable = false, user, purchase }) {
  // const {user} = useUser()
  const { cart, setCart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/explore/${product.id}`);
  };

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
    // <Link href={`/explore/${product.id}`}>
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-sm mt-10">
      {/* Image Section */}
      <div className="relative w-full h-64" onClick={handleProductClick}>
        <Image
          src={product.imageUrl} // replace with your image path
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />

      </div>

      {/* Details Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-anime-dark">
          {product.title}
        </h3>
        {!purchase &&
          <>
            <div className='flex items-center justify-start gap-2' onClick={handleProductClick}>
              {product && <Image src={product.user.image} alt={product.user.name} width={20} height={20} className='rounded-full' />}
              {/* <p className="text-sm text-anime-dark/70"> */}
              <h2 className="text-anime-purple hover:underline">
                {product.user.name}
              </h2>
              {/* </p> */}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xl font-bold text-anime-dark" onClick={handleProductClick}>${product.price}</span>
              <AddToCartBtn editable={editable} product={product} user={user} />
            </div>
          </>
        }
        {purchase &&
          <Link href={product?.fileUrl}>
            <Button size={'sm'} className="bg-anime-purple hover:bg-anime-purple mt-2">Download Product</Button>
          </Link>
        }
      </div>
    </div>
    // </Link>
  );
}
