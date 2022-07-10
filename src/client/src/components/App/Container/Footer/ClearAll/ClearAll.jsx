import styles from './ClearAll.module.css'
import anotherStyles from '../../Container.module.css'
import useClearAll from './useClearAll'

function ClearAll() {
  
  const {length, handleClearAll} = useClearAll()
  return (
    <button 
      className={[anotherStyles.button, styles.clearAllButton, length > 0 ? styles.active : ""].join(' ')}
      onClick={handleClearAll}>
        Clear All
    </button>
  )
}


export default ClearAll