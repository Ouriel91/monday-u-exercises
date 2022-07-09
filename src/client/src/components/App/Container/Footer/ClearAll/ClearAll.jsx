import styles from './ClearAll.module.css'
import anotherStyles from '../../Container.module.css'
import PropTypes from "prop-types";

function ClearAll({deleteTodo, todosLength = 0}) {
  return (
    <button 
      className={[anotherStyles.button, styles.clearAllButton, todosLength > 0 ? styles.active : ""].join(' ')}
      onClick={() => deleteTodo('delete-all')}>
        Clear All
    </button>
  )
}

ClearAll.propTypes = {
  todosLength: PropTypes.number,
  deleteTodo: PropTypes.func
}

export default ClearAll