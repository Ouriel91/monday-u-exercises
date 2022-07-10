import {useDispatch} from 'react-redux'
import {getTodos} from '../../../../../state managment/actions/todo-actions'

function useSortTodos() {
    const dispatch = useDispatch()
    const handleSorts = (e) => {
        dispatch(getTodos(`?sort=${e.target.value}`))
    }

    return {handleSorts}
}

export default useSortTodos