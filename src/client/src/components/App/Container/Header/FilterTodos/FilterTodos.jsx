import styles from './Filter.module.css'
import PropTypes from "prop-types";

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