// File: src/context/AuthContext.js
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Helper to persist
  const persistUser = (u) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  // Login (mock OTP): send phone, get/create user
  const login = async (phone) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Login failed');

    // Destructure returned user
    const u = data.user;
    const userObj = {
      id: u.userId,
      name: u.name,
      phone: u.phone,
      email: u.email,
      dob: u.dob,
      address: u.address,
      photoUrl: u.photoUrl,
      pet: u.pet,
      walletCoins: u.walletCoins,
      referralCode: u.referralCode
    };
    persistUser(userObj);
    return userObj;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  // Update profile
  const updateProfile = async (profileData) => {
    const payload = { ...profileData, userId: user.id };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/update-profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Update failed');
    // Update local user
    const updated = data.user;
    const u = {
      id: updated._id || updated.userId,
      name: updated.name,
      phone: updated.phone,
      email: updated.email,
      dob: updated.dob,
      address: updated.address,
      photoUrl: updated.photoUrl,
      pet: updated.pet,
      walletCoins: updated.walletCoins,
      referralCode: updated.referralCode
    };
    persistUser(u);
    return u;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}