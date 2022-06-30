import styles from './Bottom.module.css'
import SumTodos from '../SumTodos/SumTodos'
import ClearAll from '../ClearAll/ClearAll'
import PropTypes from "prop-types";

function Bottom({length = 0, deleteTodo}) {
  return (
    <div className={styles.bottom}>
        <SumTodos length={length}/>
        <ClearAll length={length} deleteTodo={deleteTodo}/>
    </div>
  )
}

Bottom.propTypes = {
  length: PropTypes.number,
  deleteTodo: PropTypes.func
}

export default Bottom