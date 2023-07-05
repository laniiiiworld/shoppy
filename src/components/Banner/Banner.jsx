import React from 'react';
import styles from './Banner.module.css';

export default function Banner() {
  return (
    <section className={styles.section}>
      <div className={styles.image}></div>
      <div className={styles.text}>
        <h2 className={styles.h2}>Shoppy</h2>
        <p className={styles.p}>오래 입을 수 있는, 일상 속 데일리 룩</p>
      </div>
    </section>
  );
}
