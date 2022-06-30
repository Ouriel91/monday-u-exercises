import styles from './ClearAll.module.css'
import anotherStyles from '../../Container.module.css'
import PropTypes from "prop-types";

function ClearAll({deleteTodo, length = 0}) {
  return (
    <button 
      className={[anotherStyles.button, styles.clearAllButton, length > 0 ? styles.active : ""].join(' ')}
      onClick={() => deleteTodo('delete-all')}>
        Clear All
    </button>
  )
}

ClearAll.propTypes = {
  length: PropTypes.number,
  deleteTodo: PropTypes.func
}

export default ClearAll