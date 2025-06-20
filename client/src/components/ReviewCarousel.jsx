"use client";
import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import styles from "./ReviewCarousel.module.css";

const reviews = [
  {
    id: 1,
    author: "Joshima Lin",
    content:
      "“This store believes pets aren’t just animals — they’re family, and our greatest source of love and healing. A place that truly understands their world.”",
  },
  {
    id: 2,
    author: "Alex Rivera",
    content:
      "“I’ve never seen my cat this happy—top-notch toys, food, and genuine care. Highly recommend!”",
  },
  {
    id: 3,
    author: "Sam Patel",
    content:
      "“Fast delivery, awesome customer service, and my puppy can’t get enough of their shampoos.”",
  },
];

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { author, content } = reviews[current];

  return (
    <section className={styles.carousel}>
      <blockquote className={styles.review}>
        <p className={styles.text}>{content}</p>
        <footer className={styles.author}>— {author}</footer>
      </blockquote>

      <div className={styles.dots}>
        {reviews.map((r, i) => (
          <span
            key={r.id}
            className={
              i === current ? styles.dotActive : styles.dot
            }
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      <div className={styles.iconCurve}>
        <a href="https://facebook.com" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://google.com" aria-label="Google">
          <FaGoogle />
        </a>
        <a href="https://twitter.com" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://pinterest.com" aria-label="Pinterest">
          <FaPinterest />
        </a>
      </div>
    </section>
  );
}

