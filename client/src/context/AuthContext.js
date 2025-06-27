'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id           = localStorage.getItem('userId');
    const name         = localStorage.getItem('userName');
    const image        = localStorage.getItem('userImage');
    const walletCoins  = localStorage.getItem('walletCoins');
    const referralCode = localStorage.getItem('referralCode');

    if (id && name) {
      setUser({
        id,
        name,
        image,
        walletCoins: walletCoins ? Number(walletCoins) : 0,
        referralCode
      });
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('userId',       data.userId);
    localStorage.setItem('userName',     data.name);
    localStorage.setItem('userImage',    data.imageUrl || '');
    localStorage.setItem('walletCoins',  data.walletCoins);
    localStorage.setItem('referralCode', data.referralCode);

    setUser({
      id: data.userId,
      name: data.name,
      image: data.imageUrl || '',
      walletCoins: data.walletCoins,
      referralCode: data.referralCode
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
