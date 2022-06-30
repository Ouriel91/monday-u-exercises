import React from 'react';
import styles from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
  <div className={styles.footerContainer}>
    <a href="https://github.com/Ouriel91" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon className={styles.icons} icon={faGithub} />  
    </a>
  </div>
  );
}

export default Footer;
