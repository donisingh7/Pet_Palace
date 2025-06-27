'use client';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-center mt-10">
        Please{' '}
        <a href="/login" className="text-blue-600 underline">
          sign in
        </a>{' '}
        to view your profile.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-4xl text-gray-500">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
        <div className="space-y-1">
          <p><strong>Name:</strong> {user.name}</p>
          {user.mobile && <p><strong>Mobile:</strong> {user.mobile}</p>}
          {user.email && <p><strong>Email:</strong> {user.email}</p>}
          {user.referralCode && (
            <p><strong>Referral Code:</strong> {user.referralCode}</p>
          )}
          {typeof user.walletCoins === 'number' && (
            <p><strong>Wallet Coins:</strong> {user.walletCoins}</p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/profile?tab=referral" className="block px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">
          📩 Send Referral
        </a>
        <a href="/profile?tab=password" className="block px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">
          🔒 Change Password
        </a>
        <a href="/profile?tab=address" className="block px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">
          🏠 Change Address
        </a>
      </div>
    </div>
  );
}
