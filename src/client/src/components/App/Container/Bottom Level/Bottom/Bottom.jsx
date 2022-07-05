import styles from './Bottom.module.css'
import SumTodos from '../SumTodos/SumTodos'
import ClearAll from '../ClearAll/ClearAll'

function Bottom() {
  return (
    <div className={styles.bottom}>
        <SumTodos/>
        <ClearAll/>
    </div>
  )
}

export default Bottom