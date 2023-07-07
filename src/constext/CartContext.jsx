import { createContext, useContext, useEffect, useState } from 'react';
import { onInitCart, addOrUpdateToCart } from '../api/firebase';
import { useAuthContext } from './AuthContext';

const CartContext = createContext();

export function CartContextProvider({ children }) {
  const { uid } = useAuthContext();
  const [carts, setCarts] = useState([]);

  const addCarts = async (product) => {
    const finded = carts.find((item) => item.id === product.id && item.option === product.option);
    if (finded) {
      product = { ...product, quantity: finded.quantity + 1 };
    }
    await addOrUpdateToCart(uid, product);
    onInitCart(uid, setCarts);
  };

  useEffect(() => {
    uid && onInitCart(uid, setCarts);
  }, [uid]);

  return <CartContext.Provider value={{ carts, addCarts }}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  return useContext(CartContext);
}
