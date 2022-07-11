import React from 'react';
import styles from './Info.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Info() {
  return (
  <div className={styles.infoContainer}>
    <div className={styles.thumbnail}>
      
    </div>
    
    <div className={styles.infoDetails}>
      <h1 className={styles.name}>Ouriel Ohayon</h1>
      <h2 className={styles.profession}>Fullstack & mobile Developer</h2>
      <div className={styles.links}>
        <button className={styles.email} onClick={() =>{window.location = 'mailto:orieloh91@gmail.com'}}>
            <FontAwesomeIcon icon={faEnvelope} /> Email
        </button>
        <button className={styles.linkedin} >
            <a href="https://www.linkedin.com/in/ouriel-ohayon/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />  Linkedin
            </a>
        </button>
      </div>
    </div>      
  </div>
  );
}

export default Info;
