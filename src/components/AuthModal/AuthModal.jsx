import React from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './AuthModal.module.css';

function AuthModal({ onClose, onLoginSuccess }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <h2 className={styles.title}>Sign up</h2>
        
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          onSubmit={(values) => {
            // Зберігаємо дані користувача в localStorage
            localStorage.setItem('user', JSON.stringify(values));
            // Передаємо ім'я користувача наверх в App
            onLoginSuccess(values.username);
            // Закриваємо модалку
            onClose();
          }}
        >
          {() => (
            <Form className={styles.form}>
              <div className={styles.fieldWrapper}>
                <label htmlFor="username">Username</label>
                <Field id="username" name="username" placeholder="Your name" required className={styles.input} />
              </div>

              <div className={styles.fieldWrapper}>
                <label htmlFor="email">E-mail</label>
                <Field id="email" name="email" type="email" placeholder="example@mail.com" required className={styles.input} />
              </div>

              <div className={styles.fieldWrapper}>
                <label htmlFor="password">Password</label>
                <Field id="password" name="password" type="password" placeholder="••••••••" required className={styles.input} />
              </div>

              <button type="submit" className={styles.submitBtn}>Sign up</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AuthModal;