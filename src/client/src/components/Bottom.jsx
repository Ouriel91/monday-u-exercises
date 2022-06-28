import styles from '../css/Bottom.module.css'
import SumTodos from './SumTodos'
import ClearAll from './ClearAll'

function Bottom() {
  return (
    <div className={styles.bottom}>
        <SumTodos />
        <ClearAll />
    </div>
  )
}

export default Bottom