'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Products.module.css';
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
    <div className={styles.wrapper}>
      <h1>Our Products</h1>
      <div className={styles.grid}>
        {products.map(product => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className={styles.productCard}>
              <img
                src={product.img || product.imageUrl}
                alt={product.name}
                className={styles.prodImg}
              />
              <h3 className={styles.prodName}>{product.name}</h3>
              <p className={styles.prodDesc}>
                {product.desc || product.description}
              </p>
              <div className={styles.prodPrice}>₹{products.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
