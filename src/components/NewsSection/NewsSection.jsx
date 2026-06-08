import React from 'react';
import styles from './NewsSection.module.css';

// Тимчасові дані (імітація відповіді з NewsAPI)
const MOCK_NEWS = [
  {
    id: 1,
    title: "Global Weather Trends: What to Expect This Summer",
    description: "Meteorologists predict record-breaking temperatures worldwide due to shifting ocean currents and atmospheric changes.",
    url: "https://example.com/news1",
    imageUrl: "https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&w=600&q=80",
    date: "June 8, 2026"
  },
  {
    id: 2,
    title: "How Cities Are Adapting to Extreme Rainfalls",
    description: "New green infrastructure projects in urban areas are helping absorb millions of gallons of stormwater to prevent severe flooding.",
    url: "https://example.com/news2",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80",
    date: "June 7, 2026"
  },
  {
    id: 3,
    title: "The Science Behind Gorgeous Sunsets",
    description: "Ever wondered why the sky turns bright orange and pink during autumn and summer? Discover the physics of light scattering.",
    url: "https://example.com/news3",
    imageUrl: "https://st3.depositphotos.com/1027675/16590/i/450/depositphotos_165904330-stock-photo-green-field-with-great-mountains.jpg",
    date: "June 5, 2026"
  }
];

function NewsSection() {
  return (
    <section id="news" className={styles.newsSection}>
      <h2 className={styles.sectionTitle}>Latest News & Articles</h2>
      
      <div className={styles.newsGrid}>
        {MOCK_NEWS.map((item) => (
          <article key={item.id} className={styles.newsCard}>
            <div className={styles.imageWrapper}>
              <img src={item.imageUrl} alt={item.title} className={styles.newsImage} />
            </div>
            <div className={styles.content}>
              <span className={styles.date}>{item.date}</span>
              <h3 className={styles.newsTitle}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <a href={item.url} target="_blank" rel="noreferrer" className={styles.readMore}>
                Read full article &rarr;
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;