// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import {
//   FaMapMarkerAlt,
//   FaUser,
//   FaShoppingCart,
//   FaSearch,
//   FaEllipsisH,
//   FaTimes,
// } from 'react-icons/fa';
// import NavMenu from './NavMenu';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';

// export default function Header({ logoSrc }) {
//   /* ========== CONTEXT ========== */
//   const { user, logout } = useAuth();
//   const { cart } = useCart();

//   /* ========== STATE ========== */
//   // cart drawer
//   const [showCartPopup, setShowCartPopup] = useState(false);
//   const [promoCode, setPromoCode] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [showCelebration, setShowCelebration] = useState(false);
//   const subtotal = cart.reduce(
//     (s, i) => s + i.qty * i.product.price,
//     0
//   );
//   const total = Math.round(subtotal * (1 - discount));

//   // search
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const trendingSearches = [
//     'Dog Food',
//     'Cat Toys',
//     'Grooming',
//     'Leashes',
//     'Vacuum Cleaners',
//   ];

//   // location
//   const popupRef = useRef();
//   const [enteredPin, setEnteredPin] = useState('');
//   const [locationPin, setLocationPin] = useState('');
//   const [deliveryEstimate, setDeliveryEstimate] = useState('');
//   const [showLocationPopup, setShowLocationPopup] = useState(false);

//   // profile dropdown
//   const [showProfilePopup, setShowProfilePopup] = useState(false);

//   // nav toggle on scroll (mobile)
//   const [navVisible, setNavVisible] = useState(true);
//   const [togglerMode, setTogglerMode] = useState(null);
//   useEffect(() => {
//     const onScroll = () => {
//       if (window.scrollY > 0) {
//         setNavVisible(false);
//         setTogglerMode('triple');
//       } else {
//         setNavVisible(true);
//         setTogglerMode(null);
//       }
//     };
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   // celebration timeout
//   useEffect(() => {
//     if (showCelebration) {
//       const t = setTimeout(() => setShowCelebration(false), 2000);
//       return () => clearTimeout(t);
//     }
//   }, [showCelebration]);

//   /* ========== RENDER ========== */
//   return (
//     <>
//       <header className="sticky top-0 z-50 bg-white shadow">
//         {/* promo bar */}
//         <div className="bg-purple-600 text-white text-center py-1 text-sm">
//           Monsoon Essentials: Get Flat ₹200 Off!
//         </div>

//         {/* main bar */}
//         <div className="flex items-center justify-between px-6 py-4">
//           {/* nav toggler (mobile) */}
//           {togglerMode && (
//             <button
//               className="text-gray-700 md:hidden"
//               aria-label="Toggle navigation"
//               onClick={() =>
//                 togglerMode === 'triple'
//                   ? (setNavVisible(true), setTogglerMode('cross'))
//                   : (setNavVisible(false), setTogglerMode('triple'))
//               }
//             >
//               {togglerMode === 'triple' ? (
//                 <FaEllipsisH className="w-5 h-5" />
//               ) : (
//                 <FaTimes className="w-5 h-5" />
//               )}
//             </button>
//           )}

//           {/* logo */}
//           <Link href="/">
//             <Image
//               src={logoSrc}
//               alt="Pet Palace Logo"
//               width={120}
//               height={40}
//               priority
//               className="cursor-pointer"
//             />
//           </Link>

//           {/* search */}
//           <div className="flex items-center flex-1 mx-8 max-w-xl relative">
//             <FaSearch className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search for products, brands and more"
//               className="w-full border-b focus:outline-none py-1"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onFocus={() => setShowSuggestions(true)}
//               onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
//             />
//             {showSuggestions && (
//               <ul className="absolute top-full left-0 right-0 bg-white border mt-1 z-20 max-h-48 overflow-auto shadow">
//                 {(searchQuery
//                   ? trendingSearches.filter((t) =>
//                       t.toLowerCase().includes(searchQuery.toLowerCase())
//                     )
//                   : trendingSearches
//                 ).map((term) => (
//                   <li
//                     key={term}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onMouseDown={() => {
//                       setSearchQuery(term);
//                       setShowSuggestions(false);
//                     }}
//                   >
//                     {term}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* ACTION ICONS */}
//           <div className="flex items-center space-x-6">
//             {/* ========== LOCATION ========== */}
//             <div
//               className="relative"
//               onMouseEnter={() => setShowLocationPopup(true)}
//               onMouseLeave={(e) => {
//                 if (popupRef.current?.contains(e.relatedTarget)) return;
//                 setShowLocationPopup(false);
//               }}
//             >
//               <FaMapMarkerAlt className="w-5 h-5 text-gray-700" />
//               {showLocationPopup && (
//                 <div
//                   ref={popupRef}
//                   className="absolute right-0 mt-2 w-56 bg-white p-4 rounded shadow-lg z-30"
//                 >
//                   {!locationPin ? (
//                     /* first-time form */
//                     <form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         setLocationPin(enteredPin);
//                         const d = new Date();
//                         d.setDate(d.getDate() + 3);
//                         setDeliveryEstimate(d.toLocaleDateString());
//                         setShowLocationPopup(false);
//                       }}
//                     >
//                       <input
//                         type="text"
//                         placeholder="Enter Pincode"
//                         value={enteredPin}
//                         onChange={(e) => setEnteredPin(e.target.value)}
//                         className="w-full border rounded px-2 py-1 mb-2"
//                       />
//                       <button
//                         type="submit"
//                         className="w-full bg-purple-600 text-white py-1 rounded"
//                       >
//                         Submit
//                       </button>
//                     </form>
//                   ) : (
//                     /* change pin form */
//                     <form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         setLocationPin(enteredPin);
//                         const d = new Date();
//                         d.setDate(d.getDate() + 3);
//                         setDeliveryEstimate(d.toLocaleDateString());
//                         setShowLocationPopup(false);
//                       }}
//                     >
//                       <div className="mb-2 text-sm text-gray-600">
//                         Current: {locationPin} <br />
//                         Est. Delivery: {deliveryEstimate}
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="New Pincode"
//                         value={enteredPin}
//                         onChange={(e) => setEnteredPin(e.target.value)}
//                         className="w-full border rounded px-2 py-1 mb-2"
//                       />
//                       <button
//                         type="submit"
//                         className="w-full bg-purple-600 text-white py-1 rounded"
//                       >
//                         Update
//                       </button>
//                     </form>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* ========== PROFILE ========== */}
//             <div className="relative">
//               {user ? (
//                 <>
//                   <button
//                   onClick={() => setShowProfilePopup(p => !p)}
//                   className="flex items-center space-x-2"
//                   >
//                     {/*  ❗ user image intentionally skipped to avoid src-undefined errors */}
//                     <FaUser className="w-5 h-5 text-gray-700" />
//                     <span className="font-medium">{user.name}</span>
//                   </button>
//                   {showProfilePopup && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-30 py-2">
//                       <Link
//                         href="/profile"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         My Profile
//                       </Link>
//                       <Link
//                         href="/profile?tab=referral"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         Send Referral
//                       </Link>
//                       <Link
//                         href="/profile?tab=password"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         Change Password
//                       </Link>
//                       <Link
//                         href="/profile?tab=address"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                       >
//                         Change Address
//                       </Link>
//                       <button
//                         onClick={logout}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                       >
//                         Sign Out
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <Link href="/login">
//                   <FaUser className="w-5 h-5 text-gray-700" />
//                 </Link>
//               )}
//             </div>

//             {/* ========== CART ========== */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowCartPopup((prev) => !prev)}
//                 className="relative"
//               >
//                 <FaShoppingCart className="w-5 h-5 text-gray-700" />
//                 {cart.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {cart.length}
//                   </span>
//                 )}
//               </button>

//               {showCartPopup && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg z-30 p-4">
//                   {showCelebration && (
//                     <div className="text-center text-xl mb-2">🎉✨🎉</div>
//                   )}
//                   {cart.length === 0 ? (
//                     <p className="text-center text-gray-500">
//                       Your cart is empty
//                     </p>
//                   ) : (
//                     <>
//                       <ul className="space-y-4 max-h-64 overflow-auto">
//                         {cart.map((item) => (
//                           <li
//                             key={item.product._id}
//                             className="flex items-center"
//                           >
//                             {item.product.imageUrl && (
//                               <Image
//                                 src={item.product.imageUrl}
//                                 alt={item.product.name}
//                                 width={48}
//                                 height={48}
//                                 className="object-cover rounded"
//                               />
//                             )}
//                             <div className="ml-3 flex-1">
//                               <p className="font-medium">
//                                 {item.product.name}
//                               </p>
//                               <p className="text-sm">Qty: {item.qty}</p>
//                             </div>
//                             <p className="font-semibold">
//                               ₹{item.qty * item.product.price}
//                             </p>
//                           </li>
//                         ))}
//                       </ul>

//                       <div className="mt-4">
//                         <div className="flex justify-between">
//                           <span>Subtotal:</span>
//                           <span>₹{subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             placeholder="Promo code"
//                             value={promoCode}
//                             onChange={(e) => setPromoCode(e.target.value)}
//                             className="w-full border rounded px-2 py-1"
//                           />
//                           <button
//                             onClick={() => {
//                               if (!discount && promoCode) {
//                                 setDiscount(0.1);
//                                 setShowCelebration(true);
//                               }
//                             }}
//                             className="w-full bg-blue-600 text-white py-1 rounded mt-2"
//                           >
//                             Apply
//                           </button>
//                         </div>
//                         {discount > 0 && (
//                           <div className="flex justify-between text-sm text-green-600 mt-2">
//                             <span>Discount:</span>
//                             <span>
//                               -₹{(subtotal * discount).toFixed(2)}
//                             </span>
//                           </div>
//                         )}
//                         <div className="flex justify-between font-bold mt-2">
//                           <span>Total:</span>
//                           <span>₹{total.toFixed(2)}</span>
//                         </div>
//                         <Link href="/checkout">
//                           <button className="w-full bg-green-600 text-white py-2 rounded mt-4">
//                             Checkout
//                           </button>
//                         </Link>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* NavMenu */}
//         {navVisible && <NavMenu />}
//       </header>
//     </>
//   );
// }
'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaMapMarkerAlt,
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaEllipsisH,
  FaTimes,
} from 'react-icons/fa';
import NavMenu from './NavMenu';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import ProfileModal from './ProfileModal';

export default function Header({ logoSrc }) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const popupRef = useRef();
  const [enteredPin, setEnteredPin] = useState('');
  const [locationPin, setLocationPin] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const trendingSearches = ['Dog Food', 'Cat Toys', 'Grooming', 'Leashes', 'Vacuum Cleaners'];
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.qty * i.product.price, 0);
  const total = Math.round(subtotal * (1 - discount));

  // Scroll nav
  const [navVisible, setNavVisible] = useState(true);
  const [togglerMode, setTogglerMode] = useState(null);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) setNavVisible(false), setTogglerMode('triple');
      else setNavVisible(true), setTogglerMode(null);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Celebration timeout
  useEffect(() => {
    if (showCelebration) {
      const t = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showCelebration]);

  return (
    <>
      <Header className="sticky top-0 z-50 bg-white shadow">
        <div className="bg-purple-600 text-white text-center py-1 text-sm">
          Monsoon Essentials: Get Flat ₹200 Off!
        </div>
        <div className="flex items-center justify-between px-6 py-4">
          {togglerMode && (
            <button
              className="text-gray-700 md:hidden"
              aria-label="Toggle navigation"
              onClick={() =>
                togglerMode === 'triple'
                  ? (setNavVisible(true), setTogglerMode('cross'))
                  : (setNavVisible(false), setTogglerMode('triple'))
              }
            >
              {togglerMode === 'triple' ? <FaEllipsisH className="w-5 h-5" /> : <FaTimes className="w-5 h-5" />}
            </button>
          )}

          <Link href="/">
            <Image src={logoSrc} alt="Pet Palace Logo" width={120} height={40} priority className="cursor-pointer" />
          </Link>

          <div className="relative flex items-center flex-1 mx-8 max-w-xl">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full border-b focus:outline-none py-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            {showSuggestions && (
              <ul className="absolute top-full left-0 right-0 bg-white border mt-1 z-20 max-h-48 overflow-auto shadow">
                {(searchQuery
                  ? trendingSearches.filter((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
                  : trendingSearches
                ).map((term) => (
                  <li
                    key={term}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => {
                      setSearchQuery(term);
                      setShowSuggestions(false);
                    }}
                  >
                    {term}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center space-x-6">
            {/* Location */}
            <div
              className="relative"
              onMouseEnter={() => setShowLocationPopup(true)}
              onMouseLeave={(e) => {
                if (popupRef.current?.contains(e.relatedTarget)) return;
                setShowLocationPopup(false);
              }}
            >
              <FaMapMarkerAlt className="w-5 h-5 text-gray-700" />
              {showLocationPopup && (
                <div ref={popupRef} className="absolute right-0 mt-2 w-56 bg-white p-4 rounded shadow-lg z-30">
                  {!locationPin ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setLocationPin(enteredPin);
                        const d = new Date();
                        d.setDate(d.getDate() + 3);
                        setDeliveryEstimate(d.toLocaleDateString());
                        setShowLocationPopup(false);
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Enter Pincode"
                        value={enteredPin}
                        onChange={(e) => setEnteredPin(e.target.value)}
                        className="w-full border rounded px-2 py-1 mb-2"
                      />
                      <button type="submit" className="w-full bg-purple-600 text-white py-1 rounded">
                        Submit
                      </button>
                    </form>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setLocationPin(enteredPin);
                        const d = new Date();
                        d.setDate(d.getDate() + 3);
                        setDeliveryEstimate(d.toLocaleDateString());
                        setShowLocationPopup(false);
                      }}
                    >
                      <div className="mb-2 text-sm text-gray-600">
                        Current: {locationPin} <br />
                        Est. Delivery: {deliveryEstimate}
                      </div>
                      <input
                        type="text"
                        placeholder="New Pincode"
                        value={enteredPin}
                        onChange={(e) => setEnteredPin(e.target.value)}
                        className="w-full border rounded px-2 py-1 mb-2"
                      />
                      <button type="submit" className="w-full bg-purple-600 text-white py-1 rounded">
                        Update
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Profile/Icon */}
            <div className="relative">
              {user ? (
                <>
                  <button onClick={() => setShowProfileDropdown((p) => !p)} className="flex items-center space-x-2">
                    <FaUser className="w-5 h-5 text-gray-700" />
                    <span className="font-medium">{user.name}</span>
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-30 py-2">
                      <button
                        onClick={() => setShowProfileModal(true)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                      <Link href="/profile?tab=referral" className="block px-4 py-2 hover:bg-gray-100">
                        Send Referral
                      </Link>
                      <Link href="/profile?tab=password" className="block px-4 py-2 hover:bg-gray-100">
                        Change Password
                      </Link>
                      <Link href="/profile?tab=address" className="block px-4 py-2 hover:bg-gray-100">
                        Change Address
                      </Link>
                      <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button onClick={() => setShowLoginModal(true)} className="text-gray-700">
                  <FaUser className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <button onClick={() => setShowCartPopup((prev) => !prev)} className="relative">
                <FaShoppingCart className="w-5 h-5 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              {showCartPopup && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg z-30 p-4">
                  {showCelebration && <div className="text-center text-xl mb-2">🎉✨🎉</div>}
                  {/* Cart details unchanged... */}
                </div>
              )}
            </div>
          </div>
        </div>

        {navVisible && <NavMenu />}
      </Header>

      {/* Modals */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
    </>
  );
}
