import {useSelector} from 'react-redux'
import {todosLength} from '../../../../../state managment/selectors/items-entities-selectors'
import {useDispatch} from 'react-redux'
import {deleteTodo} from '../../../../../state managment/actions/todo-actions'
import { useAlert } from 'react-alert'

function useClearAll() {
    const length = useSelector(todosLength)
    const dispatch = useDispatch()
    const alert = useAlert()

    const handleClearAll = () => {
        dispatch(deleteTodo('delete-all'))
        alert.show('delete all todos', {
            timeout: 2000,
            type: 'error',
        })
    }
    return {length, handleClearAll}
}

export default useClearAll