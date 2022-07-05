import {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {todosLength, loader} from '../../../state managment/selectors/items-entities-selectors'
import {useDispatch} from 'react-redux'
import {getTodos} from '../../../state managment/actions/todo-actions'

function useContainer() {

    const listLength = useSelector(todosLength)
    const isLoading = useSelector(loader)
    const dispatch = useDispatch()

    let count = 0;
    useEffect(() => {
        //prevent from use effect run twice (react 18+)
        if(count < 1)
            dispatch(getTodos())
        count++;
    },[]) // eslint-disable-line

    return {listLength, isLoading}
}

export default useContainer