import styles from './Footer.module.css'
import SumTodos from '../SumTodos/SumTodos'
import ClearAll from '../ClearAll/ClearAll'
import PropTypes from "prop-types";

function Footer({todosLength = 0, deleteTodo}) {
  return (
    <div className={styles.bottom}>
        <SumTodos todosLength={todosLength}/>
        <ClearAll todosLength={todosLength} deleteTodo={deleteTodo}/>
    </div>
  )
}

Footer.propTypes = {
  todosLength: PropTypes.number,
  deleteTodo: PropTypes.func
}

export default Footer