import styles from './Footer.module.css'
import {useSelector, useDispatch} from 'react-redux'
import {todosLength} from '../../../../state managment/selectors/items-entities-selectors'
import {deleteTodo} from '../../../../state managment/actions/todo-actions'
import { useAlert } from 'react-alert'
import Button from '../../../UI/Button'

function Footer() {
  const listLength = useSelector(todosLength)
  const dispatch = useDispatch()
  const alert = useAlert()

  const handleClearAll = () => {
    dispatch(deleteTodo('delete-all'))
    alert.show('delete all todos', {
        timeout: 2000,
        type: 'error',
    })
  }

  let anotherAddedClasses = ' clearAllButton'
  if(listLength > 0 ){
    anotherAddedClasses += ' active'
  }

  return (
    <div className={styles.bottom}>
        <span className={styles.todosCount}>
          You have {listLength} pending tasks
        </span>
        <Button 
          clickFunc={handleClearAll} 
          content="Clear All"
          anotherAddedClasses={anotherAddedClasses}/>
    </div>
  )
}

export default Footer