// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useCart } from '../../../context/CartContext';


// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useCart();


//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
//       .then(res => res.json())
//       .then(setProduct)
//       .catch(console.error);
//   }, [id]);

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h1>{product.name}</h1>
//       <img
//         src={product.img || product.imageUrl || '/placeholder.png'}
//         alt={product.name}
//         style={{ width: '300px', objectFit: 'cover' }}
//       />
//       <p>{product.desc || product.description}</p>
//       <h2>₹{product.price}</h2>
//       <button onClick={()=> addToCart(product._id)}>
//     Add to Cart
//   </button>
//     </div>
//   );
// }
// app/products/[id]/page.jsx
'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '../../../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(console.error)
  }, [id])

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading product…</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* --- IMAGE / GALLERY --- */}
        <div className="space-y-4">
          <img
            src={product.img || product.imageUrl || '/placeholder.png'}
            alt={product.name}
            className="w-full rounded-xl object-cover h-[400px] shadow-md"
          />
          {/* hard-coded “thumbnails” */}
          <div className="flex space-x-4">
            {['/placeholder.png','/placeholder.png','/placeholder.png'].map((src,i) => (
              <img
                key={i}
                src={src}
                alt="thumbnail"
                className="w-20 h-20 rounded-lg object-cover cursor-pointer border-2 border-transparent hover:border-pink-500"
              />
            ))}
          </div>
        </div>

        {/* --- DETAILS --- */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* dynamic vs. hard-coded */}
          <p className="mt-2 text-gray-600">
            Brand: <span className="font-medium">{product.brand || 'Acme Co.'}</span>
          </p>

          {/* price + discount badge */}
          <div className="mt-4 flex items-center space-x-3">
            <span className="text-2xl font-semibold text-pink-600">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₹{Math.round(product.price * 1.2)}
            </span>
            <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
              20% OFF
            </span>
          </div>

          {/* description */}
          <p className="mt-6 prose prose-pink">
            {product.desc || product.description}
          </p>

          {/* Add to cart */}
          <button
            onClick={() => addToCart(product)}
            className="mt-8 inline-flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-xl shadow"
          >
            Add to Cart
          </button>

          {/* some static/spec section */}
          <div className="mt-12 border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
              <div>
                <dt className="font-medium">Availability</dt>
                <dd>In Stock</dd>
              </div>
              <div>
                <dt className="font-medium">SKU</dt>
                <dd>{product._id}</dd>
              </div>
              <div>
                <dt className="font-medium">Category</dt>
                <dd>Dog Food</dd>
              </div>
              <div>
                <dt className="font-medium">Weight</dt>
                <dd>500g</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
