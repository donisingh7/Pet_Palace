'use client';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-center mt-10">Please <a href="/login" className="text-blue-600">sign in</a> to view your profile.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          {/* अगर चाहो तो future में image दिखा सकते हैं */}
          <span className="text-3xl text-gray-500">{user.name.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Referral Code:</strong> {user.referralCode}</p>
        </div>
      </div>
      {/* Future में tabs */}
      <div className="mt-6 space-y-2">
        <a href="/profile?tab=referral" className="block px-4 py-2 bg-blue-100 rounded">📩 Send Referral</a>
        <a href="/profile?tab=password" className="block px-4 py-2 bg-blue-100 rounded">🔒 Change Password</a>
        <a href="/profile?tab=address" className="block px-4 py-2 bg-blue-100 rounded">🏠 Change Address</a>
      </div>
    </div>
  );
}
