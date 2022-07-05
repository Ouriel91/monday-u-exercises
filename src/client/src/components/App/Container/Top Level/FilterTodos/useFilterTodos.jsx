import {useDispatch} from 'react-redux'
import {getTodos} from '../../../../../state managment/actions/todo-actions'

function useFilterTodos() {
    
    const dispatch = useDispatch(getTodos)

    const handleDoneUndone = (e) => {
        if(e.target.checked){
             dispatch(getTodos(`?filter=checked`))
        }
        else{
             dispatch(getTodos(`?filter=unchecked`))
        }
    }
    
    return {handleDoneUndone}
}

export default useFilterTodos