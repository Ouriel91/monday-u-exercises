import styles from './Switch.module.css'
import useFilterTodos from './useFilterTodos'
import PropTypes from "prop-types";

function FilterTodos() {
  
  const {handleDoneUndone} = useFilterTodos()

  return (
    <div style={{width: '10%'}}>
      <p>undone/done</p>
      <label className={styles.switch}>           
        <input type="checkbox" onChange={handleDoneUndone}/>
        <span className={[styles.slider, styles.round].join(' ')}></span>
      </label>
    </div>
  )
}

FilterTodos.propTypes = {
  getTodos: PropTypes.func
}

export default FilterTodos