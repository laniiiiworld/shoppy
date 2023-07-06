import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, product: { id, title, price, image } }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`, { state: { product } });
  };

  return (
    <li className={styles.product} onClick={handleClick}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{price}</p>
      </div>
    </li>
  );
}
