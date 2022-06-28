import styles from './ClearAll.module.css'
import anotherStyles from '../AppContainer/Container.module.css'

function ClearAll({deleteTodo}) {
  return (
    <button 
      className={[anotherStyles.button, styles.clearAllButton].join(' ')}
      onClick={() => deleteTodo('delete-all')}>
        Clear All
    </button>
  )
}

export default ClearAll