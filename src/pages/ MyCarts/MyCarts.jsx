import React from 'react';
import CartItem from '../../components/CartItem/CartItem';
import { useCartContext } from '../../constext/CartContext';
import Button from '../../components/ui/Button/Button';
import Bill from '../../components/Bill/Bill';
import styles from './MyCarts.module.css';

export default function Carts() {
  const { carts, updateCarts, deleteCarts, deleteAllCartItems } = useCartContext();
  const hasProducts = carts && carts.length > 0;
  const productPrice = carts && carts.reduce((acc, item) => (acc += item.price * item.quantity), 0);
  const handleClick = (e) => {
    if (!hasProducts) {
      alert('장바구니에 상품이 없습니다.');
      return;
    }
    alert('주문 되었습니다.');
    deleteAllCartItems();
  };
  const handleUpdate = (product, quantity) => updateCarts({ ...product, quantity });
  const handleDelete = (productId, option) => deleteCarts(productId, option);

  return (
    <section className={styles.section}>
      <h2>내 장바구니</h2>
      <ul className={styles.myCarts}>
        {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
        {hasProducts && carts.map((item) => <CartItem key={`${item.id}${item.option}`} item={item} handleUpdate={handleUpdate} handleDelete={handleDelete} />)}
      </ul>
      <Bill productPrice={productPrice} />
      <Button text='주문하기' onClick={handleClick} />
    </section>
  );
}
