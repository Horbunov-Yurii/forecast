import React from 'react';
import { FiRefreshCw, FiTrash2 } from 'react-icons/fi'; // Імпортуємо іконки з react-icons
import styles from './CityCard.module.css';

function CityCard({ city, onRefresh, onDelete, onSelect }) {
  return (
    <div className={styles.card} onClick={() => onSelect(city)}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cityName}>{city.name}</h3>
        <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
          {/* Кнопка Оновити */}
          <button 
            className={styles.controlBtn} 
            onClick={() => onRefresh(city.name)}
            title="Update weather"
          >
            <FiRefreshCw className={styles.refreshIcon} />
          </button>
          {/* Кнопка Видалити */}
          <button 
            className={styles.controlBtn} 
            onClick={() => onDelete(city.id)}
            title="Delete city"
          >
            <FiTrash2 className={styles.deleteIcon} />
          </button>
        </div>
      </div>

      <div className={styles.cardBody}>
        {/* Іконка погоди від OpenWeatherMap */}
        <img 
          src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`} 
          alt={city.condition} 
          className={styles.weatherIcon}
        />
        <div className={styles.tempBlock}>
          <span className={styles.temperature}>{city.temp}°C</span>
          <span className={styles.condition}>{city.condition}</span>
        </div>
      </div>
    </div>
  );
}

export default CityCard;