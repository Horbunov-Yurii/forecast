import React, { useState } from 'react';
import styles from './Hero.module.css';

function Hero({ onSearch }) { // <-- Не забудь додати onSearch у пропси вгорі!
  const [searchQuery, setSearchQuery] = useState('');

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const formattedDay = currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    onSearch(searchQuery); // Викликаємо функцію з App.jsx
    setSearchQuery('');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          
          <div className={styles.topInfo}>
            <h1 className={styles.title}>Weather dashboard</h1>
            <div className={styles.dateBlock}>
              <p className={styles.dateText}>{formattedDate}</p>
              <p className={styles.dayText}>{formattedDay}</p>
            </div>
          </div>

          <p className={styles.subtitle}>
            Create your personal list of favorite cities and always be aware of the weather.
          </p>

          {/* Форма пошуку міст */}
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search for a city..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>🔍</button>
          </form>

        </div>
      </div>
    </section>
  );
}

export default Hero;