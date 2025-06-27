'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';


export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{product.name}</h1>
      <img
        src={product.img || product.imageUrl || '/placeholder.png'}
        alt={product.name}
        style={{ width: '300px', objectFit: 'cover' }}
      />
      <p>{product.desc || product.description}</p>
      <h2>₹{product.price}</h2>
      <button onClick={()=> addToCart(product._id)}>
    Add to Cart
  </button>
    </div>
  );
}
