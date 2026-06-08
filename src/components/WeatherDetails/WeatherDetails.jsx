import React, { useState, useEffect } from 'react';
import styles from './WeatherDetails.module.css';

function WeatherDetails({ city, apiKey, onClose }) {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error('Не вдалося завантажити прогноз');
        const data = await response.json();
        
        // Беремо перші 8 елементів (це 24 години прогнозу, кожні 3 години)
        setHourlyData(data.list.slice(0, 8));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHourlyForecast();
  }, [city.name, apiKey]);

  if (loading) return <p className={styles.loading}>Завантаження прогнозу...</p>;

  // Знаходимо максимальну температуру для розрахунку висоти стовпчиків
  const temps = hourlyData.map(item => Math.round(item.main.temp));
  const maxTemp = Math.max(...temps, 1); 

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.header}>
        <h2>Detailed Weather: {city.name}</h2>
        <button className={styles.closeBtn} onClick={onClose}>Close &times;</button>
      </div>

      {/* Блок з додатковими параметрами */}
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <span>Humidity</span>
          <strong>{city.humidity}%</strong>
        </div>
        <div className={styles.infoCard}>
          <span>Wind Speed</span>
          <strong>{city.wind} m/s</strong>
        </div>
        <div className={styles.infoCard}>
          <span>Current Temp</span>
          <strong>{city.temp}°C</strong>
        </div>
      </div>

      {/* Кастомний графік відображення погодинного прогнозу */}
      <div className={styles.chartSection}>
        <h3>Hourly Forecast (24h)</h3>
        
        <div className={styles.barChartContainer}>
          {hourlyData.map((item, index) => {
            const temp = Math.round(item.main.temp);
            const time = item.dt_txt.split(' ')[1].slice(0, 5); // лишаємо тільки "HH:MM"
            const icon = item.weather[0].icon;
            
            // Розраховуємо висоту стовпчика у відсотках (мінімум 20%, щоб текст влазив)
            const heightPercent = Math.max((temp / maxTemp) * 100, 25);

            return (
              <div key={index} className={styles.chartColumn}>
                <span className={styles.barTemp}>{temp}°C</span>
                <div 
                  className={styles.bar} 
                  style={{ height: `${heightPercent}%` }}
                >
                  <img 
                    src={`https://openweathermap.org/img/wn/${icon}.png`} 
                    alt="weather status" 
                    className={styles.barIcon}
                  />
                </div>
                <span className={styles.barTime}>{time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;