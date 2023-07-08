import React from 'react';
import { FaPlus, FaEquals } from 'react-icons/fa';
import PriceCard from '../ui/PriceCard/PriceCard';
import styles from './Bill.module.css';

const STANDARD = 50_000;
const DELIVERY_CHARGE = 3_000;
export default function Bill({ productPrice }) {
  const isPay = !productPrice || productPrice >= STANDARD;

  return (
    <article className={styles.bill}>
      <PriceCard text='상품 총액' price={productPrice} />
      <FaPlus className={styles.icon} />
      <PriceCard text='배송비' price={isPay ? 0 : DELIVERY_CHARGE} />
      <FaEquals className={styles.icon} />
      <PriceCard text='총 가격' price={isPay ? productPrice : productPrice + DELIVERY_CHARGE} />
    </article>
  );
}
