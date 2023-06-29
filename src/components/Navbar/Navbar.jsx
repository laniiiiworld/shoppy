import React from 'react';
import { useAuthContext } from '../../constext/AuthContext';
import { RiTShirt2Line } from 'react-icons/ri';
import { BsCart4, BsPencilFill } from 'react-icons/bs';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import User from '../User/User';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

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
        {user && (
          <Link to='/carts' className={styles.button__icon}>
            <BsCart4 />
          </Link>
        )}
        {user?.isAdmin && (
          <Link to='/products/new' className={styles.button__icon}>
            <BsPencilFill />
          </Link>
        )}
        {!user && (
          <button className={styles.button__text} onClick={login}>
            Login
          </button>
        )}
        {user && (
          <>
            <User user={user} />
            <button className={styles.button__text} onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
