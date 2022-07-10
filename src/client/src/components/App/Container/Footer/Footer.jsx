import styles from './Footer.module.css'
import anotherStyles from '../Container.module.css'
import PropTypes from "prop-types";

function Footer({todosLength = 0, deleteTodo}) {
  return (
    <div className={styles.bottom}>
        <span className={styles.todosCount}>
          You have {todosLength} pending tasks
        </span>
        <button 
          className={[anotherStyles.button, styles.clearAllButton, todosLength > 0 ? styles.active : ""].join(' ')}
          onClick={() => deleteTodo('delete-all')}>
            Clear All
        </button>
    </div>
  )
}

Footer.propTypes = {
  todosLength: PropTypes.number,
  deleteTodo: PropTypes.func
}

export default Footer