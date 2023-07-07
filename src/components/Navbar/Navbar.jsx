import React from 'react';
import { useAuthContext } from '../../constext/AuthContext';
import { RiTShirt2Line } from 'react-icons/ri';
import { BsPencilFill } from 'react-icons/bs';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import User from '../User/User';
import Button from '../ui/Button/Button';
import CartStatus from '../CartStatus/CartStatus';

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
            <CartStatus />
          </Link>
        )}
        {user?.isAdmin && (
          <Link to='/products/new' className={styles.button__icon}>
            <BsPencilFill />
          </Link>
        )}
        {!user && <Button text='Login' onClick={login} />}
        {user && (
          <>
            <User user={user} />
            <Button text='Logout' onClick={logout} />
          </>
        )}
      </nav>
    </header>
  );
}
