'use client';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <p className="text-center text-gray-700">
          Please{' '}
          <a
            href="/login"
            className="text-indigo-600 underline hover:text-indigo-800 transition"
          >
            sign in
          </a>{' '}
          to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl transition-transform transform hover:scale-102">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Your Profile
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-500"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-5xl text-gray-500 ring-4 ring-indigo-500">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            {user.phone && (
              <p className="text-gray-700">
                <span className="font-semibold">Mobile:</span> {user.phone}
              </p>
            )}
            {user.email && (
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            )}
            {user.dob && (
              <p className="text-gray-700">
                <span className="font-semibold">DOB:</span>{' '}
                {new Date(user.dob).toLocaleDateString()}
              </p>
            )}
            {user.address && (
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span> {user.address}
              </p>
            )}
            {typeof user.walletCoins === 'number' && (
              <p className="text-gray-700">
                <span className="font-semibold">Wallet Coins:</span> {user.walletCoins}
              </p>
            )}
            {user.referralCode && (
              <p className="text-gray-700">
                <span className="font-semibold">Referral Code:</span>{' '}
                <span className="font-mono">{user.referralCode}</span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/profile?tab=referral"
            className="block text-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
          >
            📩 Send Referral
          </a>
          <a
            href="/profile?tab=password"
            className="block text-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
          >
            🔒 Change Password
          </a>
          <a
            href="/profile?tab=address"
            className="block text-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
          >
            🏠 Change Address
          </a>
        </div>
      </div>
    </div>
  );
}
