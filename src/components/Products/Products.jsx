import React from 'react';
import useProducts from '../../ hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Products.module.css';

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Somthing is wrong!</p>;

  return (
    <ul className={styles.products}>
      {products && //
        products.map((product) => <ProductCard key={product.id} product={product} />)}
    </ul>
  );
}
