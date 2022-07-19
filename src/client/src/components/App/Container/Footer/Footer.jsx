import styles from './Footer.module.css'
import {useSelector} from 'react-redux'
import {todosLength} from '../../../../state-managment/selectors/items-entities-selectors'
import {deleteAll} from '../../../../state-managment/actions/todo-actions'
import Button from '../../../UI/Button'
import useUtils from '../../../../utils/useUtils'

function Footer() {
  const listLength = useSelector(todosLength)
  const {getDispatch, getAlert} = useUtils()

  const handleClearAll = async() => {
    await getDispatch(deleteAll('delete-all'))
    getAlert('delete all todos', 2000, 'error')
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
