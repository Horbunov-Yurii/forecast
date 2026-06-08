import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './GallerySection.module.css';

// Заміни на свій реальний ключ Pixabay API
const PIXABAY_KEY = '38625269-e94cc3b88596f307f4c7cd69d'; 

function GallerySection() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Якщо ключ не вказано, завантажимо резервні гарні фото
        if (PIXABAY_KEY === 'ЗАМІНИ_НА_ТВІЙ_PIXABAY_KEY') {
          setImages([
            { id: 1, webformatURL: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80' },
            { id: 2, webformatURL: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80' },
            { id: 3, webformatURL: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80' }
          ]);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=nature&image_type=photo&per_page=5`
        );
        const data = await response.json();
        if (data.hits && data.hits.length > 0) {
          setImages(data.hits);
        }
      } catch (error) {
        console.error("Помилка завантаження галереї:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <p className={styles.loading}>Loading nature gallery...</p>;

  return (
    <section id="gallery" className={styles.gallerySection}>
      <h2 className={styles.sectionTitle}>Nature Gallery</h2>
      
      <div className={styles.sliderContainer}>
        {/* Кнопка Вліво */}
        <button className={`${styles.arrowBtn} ${styles.leftArrow}`} onClick={prevSlide}>
          <FiChevronLeft />
        </button>

        {/* Слайд */}
        <div className={styles.slideWrapper}>
          <img 
            src={images[currentIndex]?.webformatURL} 
            alt="Nature scene" 
            className={styles.sliderImage} 
          />
          <div className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Кнопка Вправо */}
        <button className={`${styles.arrowBtn} ${styles.rightArrow}`} onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default GallerySection;