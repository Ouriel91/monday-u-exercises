import styles from './Filter.module.css'
import {getTodos} from '../../../../../state-managment/actions/todo-actions'
import useUtils from '../../../../../utils/useUtils'

function FilterTodos() {
  
  const {getDispatch, getAlert} = useUtils()

  const handleDoneUndone = async(e) => {
      try{
          let status 
          if(e.target.checked){
            status = 'checked'
          }
          else{
            status = 'unchecked'
          }
          await getDispatch(getTodos(`?filter=${status}`))
      }catch(e){
          getAlert(e.message, 2000, 'error')
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
