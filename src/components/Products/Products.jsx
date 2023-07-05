import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../../api/firebase';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Products.module.css';

export default function Products() {
  const { isLoading, error, data: products } = useQuery(['products'], getProducts, { staleTime: 1000 * 60 * 5 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Somthing is wrong!</p>;

  return (
    <ul className={styles.products}>
      {products && //
        products.map((product) => <ProductCard key={product.id} product={product} />)}
    </ul>
  );
}
