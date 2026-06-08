// src/App.jsx
import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header/Header';
import AuthModal from './components/AuthModal/AuthModal';
import Hero from './components/Hero/Hero';
import CityList from './components/CityList/CityList'; // Імпортуємо CityList
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import NewsSection from './components/NewsSection/NewsSection';
import GallerySection from './components/GallerySection/GallerySection';
import Footer from './components/Footer/Footer';

const API_KEY = '1d77f7419475b60e6e45e6ad79184d4f'; 

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedCity, setSelectedCity] = useState(null); // Для майбутніх деталей погоди
  
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem('weather_cities');
    return savedCities ? JSON.parse(savedCities) : [];
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserName(parsed.username);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weather_cities', JSON.stringify(cities));
  }, [cities]);

  // Функція додавання нового міста
  const handleAddCity = async (cityName) => {
    if (cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      alert('Це місто вже є у вашому списку!');
      return;
    }
    await fetchWeatherData(cityName, 'add');
  };

  // Функція оновлення погоди для конкретного міста
  const handleRefreshCity = async (cityName) => {
    await fetchWeatherData(cityName, 'refresh');
  };

  // Спільна функція для фетчингу даних з API
  const fetchWeatherData = async (cityName, mode) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('Місто не знайдено.');
      const data = await response.json();

      const updatedCity = {
        id: data.id,
        name: data.name,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      };

      if (mode === 'add') {
        setCities(prev => [updatedCity, ...prev]);
      } else if (mode === 'refresh') {
        setCities(prev => prev.map(c => c.id === data.id ? updatedCity : c));
        alert(`Дані для міста ${data.name} оновлено!`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteCity = (id) => {
    setCities(prev => prev.filter(city => city.id !== id));
  };

  return (
    <div>
      <Header userName={userName} onOpenModal={() => setIsModalOpen(true)} />
      <Hero onSearch={handleAddCity} />
      
     <main style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {cities.length === 0 ? (
          <p style={{ textAlign: 'center', margin: '40px 0', color: '#666' }}>
            Список порожній. Додайте місто через пошук вище ☝️
          </p>
        ) : (
          <CityList 
            cities={cities} 
            onRefresh={handleRefreshCity} 
            onDelete={handleDeleteCity}
            onSelect={(city) => setSelectedCity(city)} // Встановлюємо вибране місто при кліку на картку
          />
        )}

        {/* Якщо місто вибрано, показуємо деталі під списком карток */}
        {selectedCity && (
          <WeatherDetails 
            city={selectedCity} 
            apiKey={API_KEY} 
            onClose={() => setSelectedCity(null)} // Кнопка закриття скидає стан
          />
        )}
        <NewsSection />
        <GallerySection />
      </main>
      <Footer />

      {isModalOpen && (
        <AuthModal 
          onClose={() => setIsModalOpen(false)} 
          onLoginSuccess={(name) => setUserName(name)} 
        />
      )}
    </div>
  );
}

export default App;
