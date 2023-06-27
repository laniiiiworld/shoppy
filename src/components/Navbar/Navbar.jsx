import React, { useEffect, useState } from 'react';
import { RiTShirt2Line } from 'react-icons/ri';
import { BsCart4, BsPencilFill } from 'react-icons/bs';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { onUserStateChanged, login, logout } from '../../api/firebase';

export default function Navbar() {
  const [user, setUser] = useState();
  const handleLogin = () => {
    login().then(setUser);
  };
  const handleLogout = () => {
    logout().then(setUser);
  };

  useEffect(() => {
    onUserStateChanged(setUser);
  }, []);

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to='/'>
        <RiTShirt2Line className={styles.logo__icon} />
        <h1 className={styles.logo__text}>Shoppy</h1>
      </Link>
      <nav className={styles.nav}>
        <Link to='/products' className={styles.button__text}>
          Products
        </Link>
        <Link to='/carts' className={styles.button__icon}>
          <BsCart4 />
        </Link>
        <Link to='/products/new' className={styles.button__icon}>
          <BsPencilFill />
        </Link>
        {!user && (
          <button className={styles.button__text} onClick={handleLogin}>
            Login
          </button>
        )}
        {user && (
          <button className={styles.button__text} onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
