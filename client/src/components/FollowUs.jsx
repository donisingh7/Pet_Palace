// client/src/components/FollowUs.jsx
import React from 'react'
import { FaFacebookF, FaInstagram,FaYoutube, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import styles from './FollowUs.module.css'

export default function FollowUs() {
  return (
    <div className={styles.banner}>
  <div className={styles.iconOverlay}>
    <a
      href="https://instagram.com"
      aria-label="Instagram"
      className={`${styles.icon} ${styles.instagramIcon}`}
      target="_blank"
      rel="noreferrer"
    >
      <FaInstagram />
    </a>
    <a
      href="https://twitter.com"
      aria-label="X / Twitter"
      className={`${styles.icon} ${styles.twitterIcon}`}
      target="_blank"
      rel="noreferrer"
    >
      <FaTwitter />
    </a>
    <a
      href="https://facebook.com"
      aria-label="Facebook"
      className={`${styles.icon} ${styles.facebookIcon}`}
      target="_blank"
      rel="noreferrer"
    >
      <FaFacebookF />
    </a>
    <a
      href="https://linkedin.com"
      aria-label="LinkedIn"
      className={`${styles.icon} ${styles.linkedinIcon}`}
      target="_blank"
      rel="noreferrer"
    >
      <FaLinkedinIn />
    </a>
    <a
      href="https://youtube.com"
      aria-label="YouTube"
      className={`${styles.icon} ${styles.youtubeIcon}`}
      target="_blank"
      rel="noreferrer"
    >
      <FaYoutube />
    </a>
  </div>
</div>

  )
}
