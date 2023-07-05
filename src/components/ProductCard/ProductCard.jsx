import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product: { id, title, price, image } }) {
  return (
    <li className={styles.product}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{price}</p>
      </div>
    </li>
  );
}
