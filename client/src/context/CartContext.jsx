// client/src/context/CartContext.jsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const userId = typeof window !== 'undefined' && localStorage.getItem('userId');
  const router = useRouter();

  // fetch cart on mount or userId change
  useEffect(() => {
    if (!userId) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart?userId=${userId}`)
      .then(r => r.json())
      .then(setCart)
      .catch(console.error);
  }, [userId]);

  const addToCart = async (productId) => {
    if (!userId) return alert('User not found');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ userId, productId, qty:1 })
    });
    // refetch cart
    const updated = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart?userId=${userId}`)
      .then(r=>r.json());
    setCart(updated);
    setIsOpen(true);
  };

  const checkout = async (couponCode='') => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ userId, couponCode })
    }).then(r=>r.json());
    setIsOpen(false);
    router.push(`/thankyou?orderId=${res.orderId}`);
  };

  return (
    <CartContext.Provider value={{ cart, isOpen, setIsOpen, addToCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
