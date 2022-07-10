import {memo} from 'react'
import styles from './Footer.module.css'
import PropTypes from "prop-types";
import Button from '../../../UI/Button'

function Footer({todosLength = 0, deleteTodo}) {

  const handleDeleteAll = () => {
    deleteTodo('delete-all')
  }

  let anotherAddedClasses = ' clearAllButton'
  if(todosLength > 0 ){
    anotherAddedClasses += ' active'
  }

  return (
    <div className={styles.bottom}>
        <span className={styles.todosCount}>
          You have {todosLength} pending tasks
        </span>
        <Button 
          clickFunc={handleDeleteAll} 
          content="Clear All"
          anotherAddedClasses={anotherAddedClasses}/>
    </div>
  )
}

Footer.propTypes = {
  todosLength: PropTypes.number,
  deleteTodo: PropTypes.func
}

export default memo(Footer)