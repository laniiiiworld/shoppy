import React from 'react';
import styles from './CartItem.module.css';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

export default function CartItem({ item, item: { id, image, title, option, price, quantity }, handleUpdate, handleDelete }) {
  const handleMinus = () => {
    if (quantity === 1) {
      if (window.confirm(`${title}을 삭제하시겠습니까?`)) {
        handleDelete(id, option);
      }
      return;
    }
    handleUpdate(item, quantity - 1);
  };

  return (
    <li className={styles.cartItem}>
      <div className={styles.imageArea}>
        <img className={styles.image} src={image} alt={title} />
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.option}>{option}</span>
        <span className={styles.price}>{price}</span>
      </div>
      <div className={styles.buttons}>
        <AiOutlineMinusSquare className={styles.button} onClick={handleMinus} />
        <span className={styles.quantity}>{quantity}</span>
        <AiOutlinePlusSquare className={styles.button} onClick={() => handleUpdate(item, quantity + 1)} />
        <BsFillTrashFill className={styles.button} onClick={() => handleDelete(id, option)} />
      </div>
    </li>
  );
}
