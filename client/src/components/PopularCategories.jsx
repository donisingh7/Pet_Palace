"use client";
import React from "react";
import Link from "next/link";
import styles from "./PopularCategories.module.css";

// you can import these from a CMS or your data-model
const categories = [
  { href: "/dogs/food",       label: "Dog Food",       img: "/categories/dog-food.png" },
  { href: "/cats/food",       label: "Cat Food",       img: "/categories/cat-toys.png" },
  { href: "/grooming",        label: "Grooming",       img: "/categories/grooming.png" },
  { href: "/travel",          label: "Travel",         img: "/categories/travel.png" },
  { href: "/health",          label: "Health & Care",  img: "/categories/health.png" },
  { href: "/beds",            label: "Beds & Bedding", img: "/categories/beds.png" },
];

export default function PopularCategories() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>Popular Categories</h2>
      <div className={styles.grid}>
        {categories.map(({ href, label, img }) => (
          <Link key={href} href={href} className={styles.card}>
            {/* 1. image in its own box */}
            <div className={styles.imageBox}>
              <img src={img} alt={label} className={styles.image} />
            </div>
            {/* 2. label below the box */}
            <span className={styles.label}>{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

