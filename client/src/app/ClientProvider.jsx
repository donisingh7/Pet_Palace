// // client/src/app/ClientProvider.jsx
// 'use client';
// import React, { useEffect } from 'react';

// export default function ClientProvider({ children }) {
//   useEffect(() => {
//     console.log('🔔 ClientProvider useEffect fired');              // 🔥 debug
//     console.log('API URL is', process.env.NEXT_PUBLIC_API_URL);    // 🔥 debug

//     const storedUser = localStorage.getItem('userId');
//     console.log('storedUser:', storedUser);                        // 🔥 debug

//     if (!storedUser) {
//       console.log('⚡️ Calling /auth/guest');
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/guest`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       })
//       .then(res => res.json())
//       .then(data => {
//         console.log('🛠️ Guest API response', data);
//         localStorage.setItem('userId', data.userId);
//       })
//       .catch(err => console.error('Guest API error', err));
//     }

//     const ref = new URLSearchParams(window.location.search).get('ref');
//     console.log('url ref param:', ref);                            // 🔥 debug
//     if (ref && !localStorage.getItem('referredBy')) {
//       console.log('⚡️ Calling /referral/set');
//       const userId = localStorage.getItem('userId');
//       localStorage.setItem('referredBy', ref);
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/referral/set`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId, referralCode: ref }),
//       })
//       .then(() => console.log('Referral set done'))
//       .catch(err => console.error('Referral API error', err));
//     }
//   }, []);

//   return <>{children}</>;
// }
// client/src/app/ClientProvider.jsx
'use client';
import React, { useEffect } from 'react';

export default function ClientProvider({ children }) {
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL; 
    console.log('Using API at:', api);

    // 1️⃣ Guest-User Create
        fetch(`${api}/api/auth/guest`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
     })
     .then(res => res.json())
     .then(data => localStorage.setItem('userId', data.userId))
     .catch(console.error);

    // 2️⃣ Referral Capture
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref && !localStorage.getItem('referredBy')) {
      const userId = localStorage.getItem('userId');
     
     fetch(`${api}/api/referral/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, referralCode: ref }),
      })
      .then(() => console.log('Referral set'))
      .catch(console.error);
    }
  }, []);

  return <>{children}</>;
}
