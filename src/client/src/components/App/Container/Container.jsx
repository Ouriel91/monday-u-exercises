
import styles from './Container.module.css';
import Top from './Top Level/Top/Top'
import Loader from './Main Level/Loader/Loader'
import Input from './Main Level/Input/Input'
import EmptyTodosShow from './Main Level/EmptyTodosShow/EmptyTodosShow'
import TodoList from './Main Level/TodoList/TodoList'
import Bottom from './Bottom Level/Bottom/Bottom'
import Errors from './Errors/Errors'
import useContainer from './useContainer'


function Container() {

    const {listLength, isLoading, error} = useContainer()
 
    return (
        <div className={styles.container}>
            <Top />
            {error.length > 0 ? <Errors error={error} /> : null}
            {isLoading ? <Loader /> : null}
            <Input/>
            {listLength > 0 ? <TodoList /> : <EmptyTodosShow />} 
            <Bottom />
        </div>
    )
}

export default Container