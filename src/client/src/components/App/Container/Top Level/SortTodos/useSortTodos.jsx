import {useDispatch} from 'react-redux'
import {getTodos} from '../../../../../state managment/actions/todo-actions'

function useSortTodos() {
    const dispatch = useDispatch()
    const handleSorts = async(e) => {
        await dispatch(getTodos(`?sort=${e.target.value}`))
    }

    return {handleSorts}
}

export default useSortTodos