import styles from './ClearAll.module.css'
import anotherStyles from '../AppContainer/Container.module.css'

function ClearAll({deleteTodo, length}) {
  return (
    <button 
      className={[anotherStyles.button, styles.clearAllButton, length > 0 ? styles.active : ""].join(' ')}
      onClick={() => deleteTodo('delete-all')}>
        Clear All
    </button>
  )
}

export default ClearAll