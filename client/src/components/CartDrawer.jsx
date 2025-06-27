// client/src/components/CartDrawer.jsx
'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, checkout } = useCart();
  const [promo, setPromo] = useState('');

  // Always render the overlay/drawer but toggle visibility via classes
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
            // now we can declare variables inside this block
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
              value={promo}
              onChange={e => setPromo(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
            <button
              onClick={() => {/* just recalculates total */}}
              className="mt-2 w-full bg-blue-600 text-white py-1 rounded"
            >
              Apply
            </button>
          </div>
        </div>

        <footer className="p-4 border-t">
          {(() => {
            const subtotal = cart.reduce((s, i) => s + i.qty * i.product.price, 0);
            const discount = promo ? subtotal * 0.10 : 0;
            const total = subtotal - discount;
            return (
              <>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {promo && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => checkout(promo)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded"
                >
                  Proceed to Checkout
                </button>
              </>
            );
          })()}
        </footer>
      </aside>
    </div>
  );
}
