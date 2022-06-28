function useSortTodos(getTodos) {
    const handleSorts = (e) => {
        getTodos(`?sort=${e.target.value}`)
    }

    return {handleSorts}
}

export default useSortTodos