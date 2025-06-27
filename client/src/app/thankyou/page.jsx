'use client';                // if you need client-only hooks; otherwise you can omit
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function ThankYouPage() {
  const params = useSearchParams();
  const orderId = params?.get('orderId') || '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      {orderId ? (
        <p className="text-lg">Your order <span className="font-mono">{orderId}</span> has been placed.</p>
      ) : (
        <p className="text-lg">Your order has been placed.</p>
      )}
      <a href="/" className="mt-6 text-blue-600 hover:underline">
        ← Back to Home
      </a>
    </div>
  );
}
                                                