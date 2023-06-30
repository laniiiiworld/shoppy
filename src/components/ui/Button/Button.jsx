import React from 'react';
import styles from './Button.module.css';

export default function Button({ text, onClick }) {
  return (
    <button className={styles.button__text} onClick={onClick}>
      {text}
    </button>
  );
}
