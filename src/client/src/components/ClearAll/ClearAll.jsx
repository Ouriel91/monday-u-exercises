import styles from './ClearAll.module.css'
import anotherStyles from '../AppContainer/Container.module.css'

function ClearAll() {
  return (
    <button className={[anotherStyles.button, styles.clearAllButton].join(' ')}>
        Clear All
    </button>
  )
}

export default ClearAll