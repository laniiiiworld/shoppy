import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCarts, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../constext/AuthContext';

export default function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(['carts', uid || ''], () => getCarts(uid), { enabled: !!uid });
  const { data: carts } = cartQuery;

  const addItem = useMutation(
    (product) => {
      const finded = carts.find((item) => item.id === product.id && item.option === product.option);
      if (finded) {
        product = { ...product, quantity: finded.quantity + 1 };
      }
      addOrUpdateToCart(uid, product);
    },
    { onSuccess: () => queryClient.invalidateQueries(['carts', uid]) }
  );

  const updateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product), //
    { onSuccess: () => queryClient.invalidateQueries(['carts', uid]) }
  );

  const removeItem = useMutation(
    ({ productId, option }) => removeFromCart(uid, productId, option), //
    { onSuccess: () => queryClient.invalidateQueries(['carts', uid]) }
  );

  const removeAllItems = useMutation(
    () => removeFromCart(uid), //
    { onSuccess: () => queryClient.invalidateQueries(['carts', uid]) }
  );

  return { cartQuery, addItem, updateItem, removeItem, removeAllItems };
}
