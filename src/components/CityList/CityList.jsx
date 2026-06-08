import React from 'react';
import CityCard from '../CityCard/CityCard';
import styles from './CityList.module.css';

function CityList({ cities, onRefresh, onDelete, onSelect }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Your Cities</h2>
      <div className={styles.grid}>
        {cities.map((city) => (
          <CityCard 
            key={city.id} 
            city={city} 
            onRefresh={onRefresh} 
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default CityList;