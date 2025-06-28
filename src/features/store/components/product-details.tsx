import { useContext, useState } from 'react';

import { message } from 'antd';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

// import { Product, getRelatedProducts } from "@/features/store/data/products";
// import { useCart } from "@/features/store/hooks/useCart";
// import { useComparison } from "@/features/store/hooks/useComparison";
// import ReviewCard from "./ReviewCard";
// import ProductGrid from "./ProductGrid";
import { AuthContext } from '@/features/store/context/auth-context';
import { Product } from '@/features/store/types';
import onAxios from '@/features/store/utils';

interface ProductDetailProps {
   product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
   // const { addItem } = useCart();
   // const { addProduct, isInComparison } = useComparison();
   const [quantity, setQuantity] = useState(1);
   const { getCarts } = useContext(AuthContext) as { getCarts: () => void };

   const [loading, setLoading] = useState(false);

   // const [activeTab, setActiveTab] = useState("description");
   // const relatedProducts = getRelatedProducts(product);
   // const alreadyInComparison = isInComparison(product.id);

   // Calculate discounted price if applicable
   // const discountedPrice = product.discountPercentage
   //   ? product.price * (1 - product.discountPercentage / 100)
   //   : null;

   const handleQuantityChange = (delta: number) => {
      setQuantity(Math.max(1, quantity + delta));
   };

   // const handleAddToCart = () => {
   //   if (product.inStock) {
   //     addItem(product, quantity);
   //   }
   // };

   // const handleAddToComparison = () => {
   //   addProduct(product);
   // };

   const addCart = () => {
      setLoading(true);

      onAxios
         .post('/api/e-commerce/cart/add', {
            product_id: product.id,
            quantity: quantity,
         })
         .then(() => {
            getCarts();
            // setDataCarts(res.data.data);
            // setCartMeta(res.data.meta);
            message.success('The Product Added To Cart');
         })
         .catch(() => {
            message.error('Error On Add Cart');
         })
         .finally(() => {
            setLoading(false);
         });
   };

   // console.log(product);

   return (
      <div className='container mx-auto px-4 py-8'>
         <div className='mb-10 grid grid-cols-1 gap-8 md:grid-cols-2'>
            {/* Product Image */}
            <div
               className='rounded-lg bg-white p-4 shadow-md'
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <div className='flex h-80 items-center justify-center rounded bg-gray-50'>
                  <img
                     src={product.image_url}
                     alt={product.name}
                     className='max-h-full max-w-full object-contain'
                  />
               </div>
            </div>

            {/* Product Info */}
            <div>
               {/* <span className="text-gray-500">{product.brand}</span> */}
               <h1 className='mb-2 text-3xl font-bold'>{product.name}</h1>

               {/* Rating */}
               {/* <div className="flex items-center mb-4">
            <div className="flex">
              {Array(5)
                .fill(null)
                .map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className={`${
                      idx < Math.floor(product.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : idx < product.rating
                        ? "text-yellow-500 fill-yellow-500 opacity-50"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div> */}

               {/* Price */}
               <div className='mb-6'>
                  {/* {discountedPrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-2">
                  EGP {discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  EGP {product.price.toFixed(2)}
                </span>
                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold">
                EGP {product.price.toFixed(2)}
              </span>
            )} */}
                  <span className='mt-2 text-2xl'>EGP {product.price}</span>

                  <p className='mt-4 text-gray-600'>
                     Category :{product.category.name}
                  </p>
               </div>

               {/* Stock status */}
               <div className='mb-6'>
                  <span
                     className={`inline-block rounded px-3 py-1 text-sm ${
                        product.stock === 0
                           ? 'bg-red-100 text-red-800'
                           : 'bg-green-100 text-green-800'
                     }`}
                  >
                     {product.stock === 0 ? 'Out of Stock' : 'In Stock'}
                  </span>
               </div>

               {/* Short description */}
               <p className='mb-6 text-gray-600'>{product.description}</p>

               {/* Key features */}
               {/* <div className="mb-6">
            <h3 className="font-medium mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  {feature}
                </li>
              ))}
            </ul>
          </div> */}

               {/* Add to cart section */}
               <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex items-center rounded-md border'>
                     <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className='h-10'
                     >
                        <ChevronDown size={16} />
                     </Button>
                     <span className='w-12 text-center'>{quantity}</span>
                     <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleQuantityChange(1)}
                        className='h-10'
                     >
                        <ChevronUp size={16} />
                     </Button>
                  </div>

                  <Button
                     onClick={addCart}
                     disabled={product.stock === 0}
                     className='flex-1 md:flex-none'
                     size='lg'
                  >
                     {product.stock === 0
                        ? 'Out of Stock'
                        : loading
                          ? 'Loading...'
                          : 'Add to Cart'}
                  </Button>
                  {/* <Button
              onClick={handleAddToComparison}
              variant="outline"
              size="lg"
              disabled={alreadyInComparison}
            >
              {alreadyInComparison ? "Added to Compare" : "Add to Compare"}
            </Button> */}
               </div>
            </div>
         </div>

         {/* Tabs */}
         <div className='mb-8'>
            {/* <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "description"
                  ? "border-brand-blue text-brand-blue"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "specifications"
                  ? "border-brand-blue text-brand-blue"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-brand-blue text-brand-blue"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews ({product.reviews.length})
            </button>
          </nav>
        </div> */}
            {/* 
        <div className="mt-6">
          {activeTab === "description" && (
            <div>
              <p className="text-gray-700">{product.description}</p>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-brand-green mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="bg-white rounded-md">
              {product.specifications.map((spec, index) => (
                <div key={index} className="spec-row">
                  <div className="font-medium">{spec.name}</div>
                  <div>{spec.value}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          )}
        </div> */}
         </div>

         {/* Related Products */}
         {/* {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )} */}
      </div>
   );
};

export default ProductDetail;
