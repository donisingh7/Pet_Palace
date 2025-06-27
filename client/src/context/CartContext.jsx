'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedReferralCode, setAppliedReferralCode] = useState('');
  const [referralValid, setReferralValid] = useState(false);
  const userId = typeof window !== 'undefined' && localStorage.getItem('userId');
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart?userId=${userId}`)
      .then(r => r.json())
      .then(setCart)
      .catch(console.error);
  }, [user]);

  const addToCart = async product => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.product._id === product._id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].qty++;
        return copy;
      }
      return [...prev, { product, qty: 1 }];
    });
    setIsOpen(true);
  };

  const applyReferralCode = async code => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/referral/claim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, referralCode: code })
    });
    const data = await res.json();
    if (res.ok) {
      setReferralValid(true);
      setAppliedReferralCode(code);
      alert('Referral applied!');
    } else {
      alert(data.error || 'Invalid referral');
    }
  };

  const checkout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ userId, referralCode: referralValid ? appliedReferralCode : '' })
    });
    const data = await res.json();
    setIsOpen(false);
    router.push(`/thankyou?orderId=${data.orderId}`);
  };

  return (
    <CartContext.Provider value={{
      cart, isOpen, setIsOpen, addToCart, applyReferralCode, referralValid, checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
