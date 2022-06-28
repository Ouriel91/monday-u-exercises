import styles from './Bottom.module.css'
import SumTodos from '../SumTodos/SumTodos'
import ClearAll from '../ClearAll/ClearAll'

function Bottom({length, deleteTodo}) {
  return (
    <div className={styles.bottom}>
        <SumTodos length={length}/>
        <ClearAll deleteTodo={deleteTodo}/>
    </div>
  )
}

export default Bottom