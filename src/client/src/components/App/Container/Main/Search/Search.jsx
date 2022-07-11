import styles from './Search.module.css'
import {search} from '../../../../../state managment/actions/todo-actions'
import {searchValue} from '../../../../../state managment/selectors/items-entities-selectors'
import {useSelector, useDispatch} from "react-redux"

function Search() {

    const dispatch = useDispatch()
    const inputValue = useSelector(searchValue)

    const filterTodos = (e) => {
        const input = e.target.value
        dispatch(search(input))
    }
    
    return (
        <div className={styles.container}>
            <input
                type="search"
                value={inputValue}
                onChange={filterTodos}
                className={styles.search}
                placeholder="search todo"
            />
        </div>
    )
}

export default Search