
import styles from './Container.module.css';
import Header from './Header/Header/Header'
import Loader from './Main/Loader/Loader'
import TodoInput from './Main/TodoInput/TodoInput'
import EmptyTodosShow from './Main/EmptyTodosShow/EmptyTodosShow'
import TodoList from './Main/TodoList/TodoList'
import Footer from './Footer/Footer/Footer'
import Errors from './Errors/Errors'
import Search from './Main/Search/Search'
import useContainer from './useContainer'


function Container() {

    const {listLength, isLoading, error} = useContainer()
 
    return (
        <div className={styles.container}>
            <Header />
            {error.length > 0 ? <Errors error={error} /> : null}
            {isLoading ? <Loader /> : null}
            <Search />
            <TodoInput/>
            {listLength > 0 ? <TodoList /> : <EmptyTodosShow />} 
            <Footer />
        </div>
    )
}

export default Container