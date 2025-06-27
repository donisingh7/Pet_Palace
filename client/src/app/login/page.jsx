'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [phoneInput, setPhoneInput] = useState('');      // <-- renamed
  const [passwordInput, setPasswordInput] = useState(''); // <-- renamed
  const [error, setError] = useState('');
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();   // ← get login()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // use the exact state variable names here:
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneInput,      // <-- match phoneInput
          password: passwordInput // <-- match passwordInput
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Login failed');
      return;
    }
    // on success, store and redirect
    login(data);
    router.push('/');

    setSuccess(true);
    setTimeout(() => {
    router.push('/');
  }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <div className="text-red-600 mb-2">{error}</div>}

        <label className="block mb-4">
          <span className="text-gray-700">Mobile</span>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            placeholder="Enter password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>
        {success && (
          <div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
            Successfully logged in!
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
