import React from 'react'
import styles from '../css/Top.module.css';
import FilterTodos from './FilterTodos'
import SortTodos from './SortTodos'

function Top() {
  return (
    <div className={styles.top}>
        <div className={styles.title}>PokeDoList</div>
        <p style={{width: '10%'}}>undone/done</p>
        <FilterTodos />
        <SortTodos />
    </div>
  )
}

export default Top