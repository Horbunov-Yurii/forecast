import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoBlock}>
          <span className={styles.logo}>☁️ WeatherApp</span>
          <p className={styles.copyright}>&copy; {currentYear} All rights reserved.</p>
        </div>

        <div className={styles.linksBlock}>
          <h4>Data Providers</h4>
          <ul className={styles.list}>
            <li><a href="https://openweathermap.org/" target="_blank" rel="noreferrer">OpenWeatherMap</a></li>
            <li><a href="https://newsapi.org/" target="_blank" rel="noreferrer">NewsAPI</a></li>
            <li><a href="https://pixabay.com/" target="_blank" rel="noreferrer">Pixabay</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;