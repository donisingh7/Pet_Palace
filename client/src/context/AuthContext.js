'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [appliedReferralCode, setAppliedReferralCode] = useState('');
  const [referralValid, setReferralValid] = useState(false);

const applyReferralCode = async (code) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/referral/claim`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, referralCode: code })
  });
  const data = await res.json();
  if (res.ok) {
    setReferralValid(true);
    setAppliedReferralCode(code);
    alert('Referral applied successfully!');
  } else {
    alert(data.error || 'Invalid referral code');
  }
};

  // On mount, read localStorage once
  useEffect(() => {
    const id    = localStorage.getItem('userId');
    const name  = localStorage.getItem('userName');
    const image = localStorage.getItem('userImage');
    const wallet= localStorage.getItem('walletCoins');
    const code  = localStorage.getItem('referralCode');
    if (id && name) {
      setUser({ id, name, image, wallet, code });
    }
  }, []);

  const login = (data) => {
    // save to localStorage
    localStorage.setItem('userId',       data.userId);
    localStorage.setItem('userName',     data.name);
    localStorage.setItem('userImage',    data.imageUrl);
    localStorage.setItem('walletCoins',  data.walletCoins);
    localStorage.setItem('referralCode', data.referralCode);
    // update React state
    setUser({
      id:         data.userId,
      name:       data.name,
      image:      data.imageUrl,
      wallet:     data.walletCoins,
      code:       data.referralCode
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
