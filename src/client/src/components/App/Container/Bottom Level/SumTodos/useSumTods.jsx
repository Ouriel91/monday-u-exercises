import {useSelector} from 'react-redux'
import {todosLength} from '../../../../../state managment/selectors/items-entities-selectors'


function useSumTods() {
    const length = useSelector(todosLength)
    return {length}
}

export default useSumTods