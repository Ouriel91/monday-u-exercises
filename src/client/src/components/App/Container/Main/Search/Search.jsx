import styles from './Search.module.css'
import {search} from '../../../../../state-managment/actions/todo-actions'
import {searchValue} from '../../../../../state-managment/selectors/items-entities-selectors'
import {useSelector} from "react-redux"
import useUtils from '../../../../../utils/useUtils'

function Search() {

    const {getDispatch} = useUtils()
    const inputValue = useSelector(searchValue)

    const filterTodos = (e) => {
        getDispatch(search(e.target.value))
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