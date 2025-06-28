'use client';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfileModal from '../../components/ProfileModal';

export default function ProfilePage() {
  const { user } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);

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

  // Helper to calculate age in years
  const calculateAge = (dateString) => {
    if (!dateString) return null;
    const diffMs = Date.now() - new Date(dateString).getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
  };

  // Compute profile completion
  const fields = [
    user.name,
    user.dob,
    user.email,
    user.address,
    user.phone,
    user.pet?.type,
    user.pet?.name,
    user.pet?.dob,
    user.pet?.breed
  ];
  const filledCount = fields.filter((f) => f).length;
  const completion = Math.round((filledCount / 9) * 100);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl transition-transform transform hover:scale-102">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Your Profile
          </h1>

          {/* Profile completion bar */}
          <div className="mb-6">
            <p className="text-gray-700 mb-2 font-semibold">
              Profile Completion: {completion}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* Profile details */}
          <ul className="space-y-2 text-gray-700">
            <li><strong>Name:</strong> {user.name || '-'}</li>
            <li><strong>Age:</strong> {calculateAge(user.dob) ?? '-'} years</li>
            <li><strong>Email:</strong> {user.email || '-'}</li>
            <li><strong>Address:</strong> {user.address || '-'}</li>
            <li><strong>Mobile:</strong> {user.phone || '-'}</li>
            <li><strong>Pet Type:</strong> {user.pet?.type || '-'}</li>
            <li><strong>Pet Name:</strong> {user.pet?.name || '-'}</li>
            <li><strong>Pet Age:</strong> {calculateAge(user.pet?.dob) ?? '-'} years</li>
            <li><strong>Pet Breed:</strong> {user.pet?.breed || '-'}</li>
          </ul>

          {/* Action buttons */}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => setShowReferralPopup(true)}
              className="flex-1 text-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
            >
              📩 Send Referral
            </button>
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex-1 text-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal for editing */}
      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}

      {/* Referral Popup */}
      {showReferralPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6 w-full max-w-sm text-center">
            <button
              onClick={() => setShowReferralPopup(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <p className="text-lg font-medium mb-4">Your Referral Code</p>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="font-mono text-indigo-600">{user.referralCode}</span>
              <button
                onClick={() => navigator.clipboard.writeText(user.referralCode)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
