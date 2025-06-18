
// client/src/components/Header.jsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import styles from './Header.module.css';

export default function Header({ logoSrc, cartCount = 0 }) {
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
        <form role="search" className={styles.search}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            aria-label="Search products"
          />
          <button type="submit" aria-label="Submit search">
            <FaSearch />
          </button>
        </form>

        {/* Action icons */}
        <div className={styles.actions}>
          <Link href="/location" aria-label="Select location" className={styles.action}>
            <FaMapMarkerAlt />
          </Link>
          <Link href="/account" aria-label="Login or Sign Up" className={styles.action}>
            <FaUser />
          </Link>
          <Link
            href="/cart"
            aria-label="View cart"
            className={`${styles.action} ${styles.cart}`}
          >
            <FaShoppingCart />
            <span className={styles.cartCount}>{cartCount}</span>
          </Link>
        </div>
      </div>

      {/* Navigation links */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/dogs" className={styles.navLink}>Dogs</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/cats" className={styles.navLink}>Cats</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/small-animals" className={styles.navLink}>Small Animals</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/pet-lovers" className={styles.navLink}>Pet Lovers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

