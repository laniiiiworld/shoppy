import React from 'react';
import styles from './PriceCard.module.css';

export default function PriceCard({ text, price }) {
  return (
    <div className={styles.area}>
      <label className={styles.label} htmlFor='price'>
        {text}
      </label>
      <span className={styles.price} id='price'>
        {price}
      </span>
    </div>
  );
}
