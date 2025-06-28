// File: src/components/LoginModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (!phone) return setError('Please enter phone number');
    setError('');
    setStep(2);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setError('Please enter OTP');
    setError('');
    try {
      await login(phone);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm transform transition-transform duration-300 scale-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">✕</button>
        {step === 1 ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Login with OTP</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
    