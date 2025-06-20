"use client";
import React from "react";
import Link from "next/link";
import styles from "./NavMenu.module.css";

export default function NavItem({ href, label, children }) {
  return (
    <li className={styles.navItem}>
      <Link href={href} className={styles.navLink}>
        {label}
      </Link>

      {children && (
        <ul className={styles.dropdown}>
          {children.map((child) => (
            <li key={child.href}>
              <Link href={child.href} className={styles.dropdownLink}>
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
