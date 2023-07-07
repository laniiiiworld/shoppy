import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import { useCartContext } from '../../constext/CartContext';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { addCarts } = useCartContext();
  const {
    state: {
      product: { id, title, price, image, category, description, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && '0');
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const handleChange = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      addCarts({ id, title, price, image, option: selected, quantity: 1 });

      setSuccess('장바구니에 추가되었습니다.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <p className={styles.category}>{category}</p>
      <section className={styles.section}>
        <div className={styles.image__area}>
          <img src={image} alt={title} className={styles.image} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.price}>{price}</p>
          <pre className={styles.description}>{description}</pre>
          <div className={styles.options}>
            <label htmlFor='select' className={styles.options__text}>
              옵션:
            </label>
            <select id='select' className={styles.options__select} value={selected} onChange={handleChange}>
              {options.map((option, index) => (
                <option key={index} value={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {success && <p>✅ {success}</p>}
          <Button text={isUploading ? '추가중...' : '장바구니에 추가'} onClick={handleClick} disabled={isUploading} />
        </div>
      </section>
    </>
  );
}
