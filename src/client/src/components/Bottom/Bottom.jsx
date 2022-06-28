import styles from './Bottom.module.css'
import SumTodos from '../SumTodos/SumTodos'
import ClearAll from '../ClearAll/ClearAll'

function Bottom({length, deleteTodo}) {
  return (
    <div className={styles.bottom}>
        <SumTodos length={length}/>
        <ClearAll length={length} deleteTodo={deleteTodo}/>
    </div>
  )
}

export default Bottom