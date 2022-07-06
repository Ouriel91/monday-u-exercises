import {useDispatch} from 'react-redux'
import {getTodos} from '../../../../../state managment/actions/todo-actions'
import { useAlert } from 'react-alert'

function useFilterTodos() {
    
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
    
    return {handleDoneUndone}
}

export default useFilterTodos