import styles from '../css/ClearAll.module.css'
import anotherStyles from '../css/Container.module.css'

function ClearAll() {
  return (
    <button className={[anotherStyles.button, styles.clearAllButton].join(' ')}>
        Clear All
    </button>
  )
}

export default ClearAll