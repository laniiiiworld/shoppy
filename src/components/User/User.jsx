import React from 'react';
import styles from './User.module.css';

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className={styles.div}>
      <img className={styles.photo} src={photoURL} alt={displayName} />
      <span className={styles.name}>{displayName}</span>
    </div>
  );
}
