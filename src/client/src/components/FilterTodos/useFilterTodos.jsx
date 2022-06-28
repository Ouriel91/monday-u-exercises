function useFilterTodos(getTodos) {
    
    const handleDoneUndone = (e) => {
        if(e.target.checked){
            getTodos(`?filter=checked`)
        }
        else{
            getTodos(`?filter=unchecked`)
        }
    }
    
    return {handleDoneUndone}
}

export default useFilterTodos