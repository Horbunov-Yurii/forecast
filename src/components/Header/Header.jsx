import React from 'react';
import styles from './Header.module.css';

function Header({ userName, onOpenModal }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span>☁️</span> WeatherApp
        </div>

        <nav className={styles.nav}>
          <a href="#hero" className={styles.navLink}>Home</a>
          <a href="#news" className={styles.navLink}>News</a>
          <a href="#gallery" className={styles.navLink}>Gallery</a>
        </nav>

        <div className={styles.authBlock}>
          {/* Якщо userName є — показуємо ім'я, інакше — кнопку */}
          {userName ? (
            <span className={styles.userGreeting}>👋 {userName}</span>
          ) : (
            <button className={styles.loginBtn} onClick={onOpenModal}>Sign Up</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;