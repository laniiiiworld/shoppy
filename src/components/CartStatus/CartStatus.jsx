import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import useCarts from '../../ hooks/useCarts';
import styles from './CartStatus.module.css';

export default function CartStatus() {
  const {
    cartQuery: { data: carts },
  } = useCarts();

  return (
    <div className={styles.icon}>
      <BsCart4 className={styles.icon__image} />
      {carts ? <span className={styles.icon__count}>{carts.length}</span> : ''}
    </div>
  );
}
