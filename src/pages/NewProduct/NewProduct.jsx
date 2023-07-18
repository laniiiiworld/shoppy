import React, { useState } from 'react';
import useProducts from '../../ hooks/useProducts';
import { uploadImage } from '../../api/uploader';
import Button from '../../components/ui/Button/Button';
import styles from './NewProduct.module.css';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const { addProduct } = useProducts();
  const [file, setFile] = useState();
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      addProduct.mutate(
        { product, url },
        {
          onSuccess: () => {
            setSuccess('성공적으로 등록되었습니다.');
            setTimeout(() => setSuccess(''), 3000);
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>새로운 제품 등록</h1>
      {success && <p>✅ {success}</p>}
      {file && <img className={styles.preview} src={URL.createObjectURL(file)} alt='local file' />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='file' accept='image/*' name='file' required onChange={handleChange} />
        <input type='text' placeholder='제품명' name='title' value={product.title ?? ''} required onChange={handleChange} />
        <input type='number' placeholder='가격' name='price' value={product.price ?? ''} required onChange={handleChange} />
        <input type='text' placeholder='카테고리' name='category' value={product.category ?? ''} required onChange={handleChange} />
        <input type='text' placeholder='제품 설명' name='description' value={product.description ?? ''} required onChange={handleChange} />
        <input type='text' placeholder='옵션들(콤마(,)로 구분)' name='options' value={product.options ?? ''} required onChange={handleChange} />
        <Button text={isUploading ? '업로드중...' : '제품 등록하기'} disabled={isUploading} />
      </form>
    </section>
  );
}
