import React from 'react'
import Image from 'next/image'
import styles from './FooterTopIcons.module.css'

const items = [
  {
    img: '/icons/delivery.gif',
    title: '24hr Delivery',
    subtitle: 'In 24 cities',
  },
  {
    img: '/icons/happy-parents.gif',
    title: '1,50,000+',
    subtitle: 'Happy pet parents',
  },
  {
    img: '/icons/vet-consult.gif',
    title: 'Complimentary vet consult',
    subtitle: 'For every new member',
  },
  {
    img: '/icons/pharmacy.gif',
    title: 'Pet Pharmacy',
    subtitle: 'Exclusive',
  },
]

export default function FooterTopIcons() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {items.map(({ img, title, subtitle }) => (
          <div key={title} className={styles.card}>
            <div className={styles.icon}>
              <Image src={img} alt={title} width={64} height={64} />
            </div>
            <div className={styles.text}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
