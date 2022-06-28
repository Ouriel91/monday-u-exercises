import styles from './Switch.module.css'

function FilterTodos({getTodos}) {
  
  const handleDoneUndone = (e) => {
    if(e.target.checked){
      getTodos(`?filter=checked`)
    }
    else{
      getTodos(`?filter=unchecked`)
    }
  }

  return (
    <label className={styles.switch}>           
      <input type="checkbox" onChange={handleDoneUndone}/>
      <span className={[styles.slider, styles.round].join(' ')}></span>
    </label>
  )
}

export default FilterTodos