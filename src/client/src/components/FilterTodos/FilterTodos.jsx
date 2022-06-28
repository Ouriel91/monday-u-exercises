import styles from './Switch.module.css'
import useFilterTodos from './useFilterTodos'
function FilterTodos({getTodos}) {
  
  const {handleDoneUndone} = useFilterTodos(getTodos)

  return (
    <label className={styles.switch}>           
      <input type="checkbox" onChange={handleDoneUndone}/>
      <span className={[styles.slider, styles.round].join(' ')}></span>
    </label>
  )
}

export default FilterTodos