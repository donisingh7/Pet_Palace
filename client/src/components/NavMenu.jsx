// client/src/components/NavMenu.jsx
// import Link from 'next/link'
import styles from './NavMenu.module.css'
import DogsNavItem from "./NavItems/DogsNavItem";
import CatsNavItem from "./NavItems/CatsNavItem";
import ConsultVetNavItem from './NavItems/consultvetNavItem';
import PharmacyNavItem from './NavItems/PharmacyNavItem';
import GroomingNavItem from './NavItems/GroomingNavItem';

export default function NavMenu() {
  // const items = [
  //   { href: '/dogs',       label: 'Dogs' },
  //   { href: '/cats',       label: 'Cats' },
  //   { href: '/Consult-a-vet',  label: 'Consult a Vet' },
  //   { href: '/pet-Pharmacy',   label: 'Pet Pharmacy' },
  //   { href: '/grooming',   label: 'Grooming' },
  // ]

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
      <DogsNavItem />
      <CatsNavItem />
      <ConsultVetNavItem />
      <PharmacyNavItem/>
      <GroomingNavItem/>
        {/* {items.map(({ href, label }) => (
          <li key={href} className={styles.navItem}>
            <Link href={href} className={styles.navLink}>
              {label}
            </Link>
          </li>
        ))} */}
      </ul>
    </nav>
  )
}
