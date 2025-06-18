// client/src/components/Header.jsx
import React from 'react'
import styles from './Header.module.css'

export default function Header({ logoSrc }) {
  return (
    <header className={styles.petHeader}>
      <div className={styles.topBar}>
        <p>Monsoon Essentials: Get Flat ₹200 Off!</p>
      </div>
      <div className={styles.main}>
        <div className={styles.logo}>
          <a href="/"><img src={logoSrc} alt="Logo" /></a>
        </div>
        <form className={styles.search}>
          <input type="text" placeholder="Search for products, brands and more" />
          <button type="submit" aria-label="Search">🔍</button>
        </form>
        <div className={styles.actions}>
          <a href="/location" className={styles.action}>📍 <span>Location</span></a>
          <a href="/account" className={styles.action}>👤 <span>Login/Sign Up</span></a>
          <a href="/cart" className={styles.action + ' ' + styles.cart}>
            🛍️<span className={styles.cartCount}>0</span>
          </a>
        </div>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="/dogs">Dogs</a></li>
          <li><a href="/cats">Cats</a></li>
          <li><a href="/small-animals">Small Animals</a></li>
          <li><a href="/pet-lovers">Pet Lovers</a></li>
        </ul>
      </nav>
    </header>
  )
}
