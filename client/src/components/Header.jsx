"use client";
// client/src/components/Header.jsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import NavMenu from './NavMenu'


export default function Header({ logoSrc, cartCount = 3 }) {
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [locationPin, setLocationPin] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState('');
  const [loginMethod, setLoginMethod] = useState('otp');
  const [mobileInput, setMobileInput] = useState('');
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [localCartCount, setLocalCartCount] = useState(cartCount);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const popupRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  // static trending list
  const trendingSearches = [
    'Dog Food',
    'Cat Toys',
    'Grooming',
    'Leashes',
    'Vacuum Cleaners'
  ];
    // right after your useState declarations
  const sampleUserPhoto = '/doni.jpeg';  // URL into /public folder
   // sample cart items
  const cartItems = [
    { id:1, name:'Dog Shampoo', img:'/shampoo_dog.png', price:1599 },
    { id:2, name:'Cleaning Wipe', img:'/cleaning_wipe.png', price:1799 },
    { id:3, name:'Comb', img:'/comb.png', price:599 },
    { id:4, name:'Cat Grooming Kit', img:'/gromingcat.png', price:649 },
  ];
  const subtotal = cartItems.reduce((sum, i) => sum + i.price, 0);
  const total = Math.round(subtotal * (1 - discount));

  // clear celebration after 2s
  useEffect(() => {
    if (showCelebration) {
      const t = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showCelebration]);

  return (
    <header className={styles.petHeader}>
      {/* Top promo bar */}
      <div className={styles.topBar}>
        <p>Monsoon Essentials: Get Flat ₹200 Off!</p>
      </div>

      {/* Main header */}
      <div className={styles.main}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" aria-label="Home">
            <Image
              src={logoSrc}
              alt="Pet Palace Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
        </div>

       {/* Search */}
        <form
          role="search"
          className={styles.searchWrapper}
          onSubmit={e => {
            e.preventDefault();
            setShowSuggestions(false);
          }}
        >
          {/* left icon */}
          <div className={styles.searchIcon}>
            <FaSearch />
          </div>

          {/* text input */}
          <input
            type="text"
            placeholder="Search for products, brands and more"
            aria-label="Search products"
            className={styles.searchInput}
            value={searchQuery}
           onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
         />

         {/* clear-icon */}
          {searchQuery && (
            <div
              className={styles.clearIcon}
              onClick={() => setSearchQuery('')}
           >
              <FaTimes />
           </div>
          )}

          {/* suggestions dropdown */}
         {showSuggestions && (
            <ul className={styles.suggestionsDropdown}>
              {(searchQuery
                ? trendingSearches.filter(item =>
                    item
                     .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                : trendingSearches
              ).map(term => (
                <li
                  key={term}
                  className={styles.suggestionItem}
                  onMouseDown={() => {
                    setSearchQuery(term);
                    setShowSuggestions(false);
                  }}
                >
                  {term}
                </li>
              )
            )
          
          }
          
            </ul>
          )}
        </form>

        {/* Action icons */}
        <div className={styles.actions}>
          <div
            className={styles.locationWrapper}
            onMouseEnter={() => setShowLocationPopup(true)}
            onMouseLeave={(e) => {
              // if the cursor is moving into the popup itself, don't hide
              if (popupRef.current && popupRef.current.contains(e.relatedTarget)) return;
              setShowLocationPopup(false);
            }}
          >
            <FaMapMarkerAlt className={styles.action} />
            
            {/* once user submits, show pin & estimate */}
            {locationPin && (
              <div className={styles.locationInfo}>
                <span className={styles.locationText}>{locationPin}</span>
                <span className={styles.estimateText}>
                  Est. Delivery {deliveryEstimate}
                </span>
              </div>
            )}

            {/* hover-popup form */}
               {showLocationPopup && (
              <div ref={popupRef} className={styles.locationPopup}>
                  {!locationPin ? (
                  /* First time entry form */
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
                        className={styles.locationInput}
                      />
                      <button type="submit">Enter</button>
                    </form>
                  ) : (
                    /* Change-pincode form */
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
                      <div className={styles.changeHeader}>
                        <span>Current: {locationPin}</span>
                        <span>Est. Delivery: {deliveryEstimate}</span>
                      </div>
                      <input
                        type="text"
                        placeholder="New Pincode"
                        value={enteredPin}
                        onChange={(e) => setEnteredPin(e.target.value)}
                        className={styles.locationInput}
                      />
                      <button type="submit">Update</button>
                    </form>
                  )}
              </div>
            )}
          </div>
          <div
  className={`${styles.userIconWrapper} ${styles.action}`}
  onMouseEnter={() => setShowSignupPopup(true)}
  onMouseLeave={() => setShowSignupPopup(false)}
>
  {isLoggedIn && userPhoto ? (
    <Image
      src={userPhoto}
      alt="User"
      width={32}
      height={32}
      className={styles.userPhoto}
    />
  ) : (
    <FaUser className={styles.action} />
  )}

  {showSignupPopup && !isLoggedIn && (
    <div className={styles.loginPopup}>
      {/* Tabs */}
      <div className={styles.loginTabs}>
        <button
          className={loginMethod === 'otp' ? styles.activeTab : ''}
          onClick={() => setLoginMethod('otp')}
        >
          OTP Login
        </button>
        <button
          className={loginMethod === 'password' ? styles.activeTab : ''}
          onClick={() => setLoginMethod('password')}
        >
          ID/Password
        </button>
      </div>

      {/* OTP form */}
      {loginMethod === 'otp' ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // simulate successful OTP login
            setIsLoggedIn(true);
            setUserPhoto(sampleUserPhoto);
            setLocalCartCount(localCartCount + 1); // bump cart count
            setShowSignupPopup(false);
          }}
        >
          <input
            type="tel"
            placeholder="Mobile number"
            value={mobileInput}
            onChange={(e) => setMobileInput(e.target.value)}
            className={styles.loginInput}
          />
          <button type="submit" className={styles.loginButton}>
            Login via OTP
          </button>
        </form>
      ) : (
        /* ID/password form */
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // simulate successful ID/password login
            setIsLoggedIn(true);
            setUserPhoto(sampleUserPhoto);
            setLocalCartCount(localCartCount + 1);
            setShowSignupPopup(false);
          }}
        >
          <input
            type="text"
            placeholder="Username or Email"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            className={styles.loginInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            className={styles.loginInput}
          />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      )}
    </div>
  )}
            {showSignupPopup && isLoggedIn && (
              <div className={styles.profilePopup}>
                <div className={styles.profileHeader}>
                  <Image
                    src={userPhoto}
                    alt="User"
                    width={40}
                    height={40}
                    className={styles.userPhoto}
                  />
                  <div>
                    <p className={styles.profileName}>Doni Singh Agrawal</p>
                    <p className={styles.profileType}>Cat Owner Meow meow</p>
                  </div>
                </div>
                <ul className={styles.profileOptions}>
                  <li><button type="button">Change Address</button></li>
                  <li><button type="button">Buy from Categories</button></li>
                  <li><button type="button">Your Orders</button></li>
                  <li><button type="button">Track Your Order</button></li>
                  <li><button type="button">Settings</button></li>
                  <li><button type="button">Change Theme</button></li>
                  <li><button type="button">Sign Out</button></li>
                </ul>
              </div>
            )}
          </div>

          <div
          className={styles.cartWrapper}
          onMouseEnter={() => setShowCartPopup(true)}
          onMouseLeave={() => setShowCartPopup(false)}
        >
          <FaShoppingCart className={styles.action} />
          <span className={styles.cartCount}>{localCartCount}</span>

          {showCartPopup && (
            <div className={styles.cartPopup}>
              {showCelebration && (
                <div className={styles.confetti}>🎉✨🎉</div>
              )}
              <ul className={styles.cartItems}>
                {cartItems.map(item => (
                  <li key={item.id} className={styles.cartItem}>
                    <img src={item.img} alt={item.name} />
                    <div>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemPrice}>₹{item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.cartTotal}>
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className={styles.promoSection}>
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className={styles.promoInput}
                />
                <button
                  type="button"
                  className={styles.promoButton}
                  onClick={() => {
                    if (promoCode === '123' && !isPromoApplied) {
                      setDiscount(0.1);
                      setIsPromoApplied(true);
                      setShowCelebration(true);
                    }
                  }}
                >
                  Apply
                </button>
              </div>
              <div className={styles.cartTotal}>
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
              <Link href="/checkout" passHref>
                <button className={styles.checkoutButton}>
                  Checkout
                </button>
              </Link>
              <div className={styles.addressSection}>
                {locationPin ? (
                  <p>Pincode: {locationPin}</p>
                ) : (
                  <button
                    type="button"
                    className={styles.changePinButton}
                    onClick={() => setShowLocationPopup(true)}
                  >
                    Add Pincode
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Navigation links */}
        <NavMenu />
    </header>
  );
}

