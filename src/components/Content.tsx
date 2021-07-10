import React from 'react';
import styles from '../assets/scss/Home.module.scss';

export default function Content() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </main>
  );
}
