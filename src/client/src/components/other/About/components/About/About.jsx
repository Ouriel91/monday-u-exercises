import React from 'react';
import styles from './About.module.css'

function About() {
  return (
  <div className={styles.aboutContainer}>
      <h1 className={styles.aboutTitle}>About</h1>
      <p className={styles.aboutDescription}>
        I am a fullstack & mobile - html, css, and javascript,
        React, React Native frameworks.  
        Server-side - node.js .
      </p>
  </div>
  );
}

export default About;
