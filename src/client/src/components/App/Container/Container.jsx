import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {loader, errorMessage} from '../../../state managment/selectors/items-entities-selectors'
import {getTodos} from '../../../state managment/actions/todo-actions'
import styles from './Container.module.css';
import Header from './Header/Header/Header'
import Loader from './Main/Loader/Loader'
import TodoInput from './Main/TodoInput/TodoInput'
import TodoList from './Main/TodoList/TodoList'
import Footer from './Footer/Footer'
import Errors from './Errors/Errors'
import Search from './Main/Search/Search'

function Container() {

    const isLoading = useSelector(loader)
    const error = useSelector(errorMessage)
    const dispatch = useDispatch()

    let count = 0;
    useEffect(() => {
        //prevent from use effect run twice (react 18+)
        if(count < 1){
            dispatch(getTodos())
        }
        count++;
    },[]) // eslint-disable-line 
 
    return (
        <div className={styles.container}>
            <Header />
            {error.length > 0 ? <Errors error={error} /> : null}
            {isLoading ? <Loader /> : null}
            <Search />
            <TodoInput/>
            <TodoList />
            <Footer />
        </div>
    )
}

export default Container