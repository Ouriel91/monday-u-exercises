import styles from './Filter.module.css'
import {useDispatch} from 'react-redux'
import {getTodos} from '../../../../../state managment/actions/todo-actions'
import { useAlert } from 'react-alert'

function FilterTodos() {
  
  const dispatch = useDispatch()
  const alert = useAlert()

  const handleDoneUndone = (e) => {
      try{
          if(e.target.checked){
              dispatch(getTodos(`?filter=checked`))
          }
          else{
              dispatch(getTodos(`?filter=unchecked`))
          }
      }catch(e){
          alert.show(e.message, {
              timeout: 2000,
              type: 'error',
          })
      }   
  }

  return (
    <div style={{width: '10%'}}>
      <p>undone/done</p>
      <label className={styles.switch}>           
        <input type="checkbox" onChange={handleDoneUndone}/>
        <span className={[styles.slider, styles.round].join(' ')}></span>
      </label>
    </div>
  )
}

export default FilterTodos