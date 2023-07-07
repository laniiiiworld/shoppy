import React from 'react';
import { useCartContext } from '../../constext/CartContext';

export default function Carts() {
  const { carts } = useCartContext();

  return (
    <ul>
      {carts.map((item) => (
        <li key={`${item.id}${item.option}`}>
          {item.title} {item.option} {item.quantity}
        </li>
      ))}
    </ul>
  );
}
