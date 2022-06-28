import React from 'react'
import styles from '../css/Switch.module.css'

function FilterTodos() {
  return (
    <label className={styles.switch}>           
      <input type="checkbox"/>
      <span className={[styles.slider, styles.round].join(' ')}></span>
    </label>
  )
}

export default FilterTodos