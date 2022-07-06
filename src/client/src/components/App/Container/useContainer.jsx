import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {todosLength, loader, errorMessage} from '../../../state managment/selectors/items-entities-selectors'
import {getTodos} from '../../../state managment/actions/todo-actions'
import { useAlert } from 'react-alert'

function useContainer() {

    const listLength = useSelector(todosLength)
    const isLoading = useSelector(loader)
    const error = useSelector(errorMessage)
    const dispatch = useDispatch()
    const alert = useAlert()

    let count = 0;
    useEffect(() => {
        //prevent from use effect run twice (react 18+)
        if(count < 1){
            dispatch(getTodos())
        }
        count++;
    },[dispatch, count]); 

    return {listLength, isLoading, error, alert}
}

export default useContainer