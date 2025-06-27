'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div
            key={product._id}
            className="border rounded-lg p-4 hover:shadow-lg flex flex-col"
          >
            <Link href={`/products/${product._id}`}>
              <img
                src={product.img || product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded cursor-pointer"
              />
            </Link>
            <h3 className="mt-4 font-medium flex-1">{product.name}</h3>
            <p className="text-pink-600 font-bold">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
