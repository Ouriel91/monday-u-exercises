import styles from './Footer.module.css'
import SumTodos from '../SumTodos/SumTodos'
import ClearAll from '../ClearAll/ClearAll'

function Footer() {
  return (
    <div className={styles.bottom}>
        <SumTodos/>
        <ClearAll/>
    </div>
  )
}

export default Footer