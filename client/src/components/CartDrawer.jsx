// client/src/components/CartDrawer.jsx
'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, checkout } = useCart();
  const { user } = useAuth(); // to send userId in claim
  const [promoInput, setPromoInput] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [promoError, setPromoError] = useState('');

  // Calculate subtotals and totals
  const subtotal = cart.reduce((s, i) => s + i.qty * i.product.price, 0);
  const discount = appliedCode ? subtotal * 0.10 : 0;
  const total = subtotal - discount;

  // Handle promo code validation via backend
  const applyPromo = async () => {
    if (!promoInput.trim()) return setPromoError('Enter a code');
    setPromoError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/referral/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, referralCode: promoInput.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setAppliedCode(promoInput.trim());
        alert('Referral applied! 🎉');
      } else {
        setPromoError(data.error || 'Invalid code');
      }
    } catch (err) {
      setPromoError('Failed to apply code');
    }
  };

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50
           transform transition-transform duration-300 ${
             isOpen ? 'translate-x-0' : 'translate-x-full'
           } flex flex-col`}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">My Bag ({cart.length})</h2>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </header>

        <div className="p-4 overflow-y-auto flex-1">
          {cart.map(item => {
            const key = item.product._id || item.product.id;
            return (
              <div key={key} className="flex mb-4">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-3 flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p>Qty: {item.qty}</p>
                  <p>₹{item.qty * item.product.price}</p>
                </div>
              </div>
            );
          })}

          <div className="mt-4">
            <input
              type="text"
              placeholder="Promo code"
              value={promoInput}
              onChange={e => setPromoInput(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
            {promoError && <p className="text-red-600 text-sm mt-1">{promoError}</p>}
            <button
              onClick={applyPromo}
              className="mt-2 w-full bg-blue-600 text-white py-1 rounded"
            >
              Apply
            </button>
          </div>
        </div>

        <footer className="p-4 border-t">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          {appliedCode && (
            <div className="flex justify-between text-sm text-green-600 mt-2">
              <span>Discount (10%)</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between font-bold mt-4">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              // pass only the applied/promotional code, not raw input
              checkout(appliedCode);
            }}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </footer>
      </aside>
    </div>
  );
}
