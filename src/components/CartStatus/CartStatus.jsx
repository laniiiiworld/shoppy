import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import { useCartContext } from '../../constext/CartContext';
import styles from './CartStatus.module.css';

export default function CartStatus() {
  const { carts } = useCartContext();
  return (
    <div className={styles.icon}>
      <BsCart4 className={styles.icon__image} />
      {carts.length ? <span className={styles.icon__count}>{carts.length}</span> : ''}
    </div>
  );
}
