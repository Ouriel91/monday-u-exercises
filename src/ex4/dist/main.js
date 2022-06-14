import ItemClient from './clients/item-client.js'

export default class Main{
    constructor(){
        this.itemClient = new ItemClient()
        this.todoList = []
        //this.itemManager = new ItemManager(this);
    }

    showTodos() {
        this.showMatchUiByTodosNumber() 
        this.createTodoListItems() 
    }

    showMatchUiByTodosNumber() {
        const sumTodos = document.getElementById("sum-todos")
        sumTodos.textContent = this.todoList.length
        
        if(this.todoList.length > 0){
            this.updateUIWithNonEmptyInput()
        }
        else{
            this.updateUIWithEmptyInput()
        }
    }

    updateUIWithNonEmptyInput() {
        const enterTodos = document.getElementById("enter-todos")
        const clearAllTodosButton = document.getElementById("clear-all-todos-button")

        clearAllTodosButton.classList.add("active")
        clearAllTodosButton.style.cursor = "pointer"
        enterTodos.style.display = "none"
    }

    updateUIWithEmptyInput() {
        const enterTodos = document.getElementById("enter-todos")
        const clearAllTodosButton = document.getElementById("clear-all-todos-button")

        clearAllTodosButton.classList.remove("active")
        clearAllTodosButton.style.cursor = "not-allowed"
        enterTodos.style.display = "block"
    }

    createTodoListItems() {
        const todoInput = document.getElementById("todo-input")

        this.createItemsByCurrentData()
        this.createItemsDeleteFuctionality()
        
        todoInput.value = "" //clear input
    }

    createItemsByCurrentData(){
        const todoListElement = document.getElementById("todo-list")

        const listItems = this.createListItems()
    
        todoListElement.innerHTML = listItems
    }

    async createListItems(){
        let listItems = ""

        this.todoList = await this.itemClient.getTodoList()

        this.todoList.forEach((todo) => { 
            listItems += `<li class="todo-item">${todo}
                <div>
                    <span class="action-btn delete">
                        <i class="fas fa-trash"></i>
                    </span>
                </div>
                </li>
            `
        })

        return listItems
    }

    createItemsDeleteFuctionality(){
        const deleteItems = document.querySelectorAll(".delete")

        deleteItems.forEach((item, index) => {
            item.addEventListener("click", () => this.deleteTodo(index))
        })
    }


    deleteTodo(index){
        const removedTodo = this.itemManager.deleteTodo(index)
        alert(`removed new todo ${removedTodo}`) 
        //return removedTodo
    }

    addTodo(todoInput){
        const todoInputEl = document.getElementById("todo-input")
        const addTodoButton = document.getElementById("add-todo-button")

        let enterValue = todoInputEl.value
        const inputIsEmpty = enterValue.trim() === ""

        if(inputIsEmpty){
            alert("todo cannot be empty")
        }
        else{
            alert(`added new todo ${enterValue}`)
        }
        this.itemManager.addTodo(todoInput)
        addTodoButton.classList.remove("active")
    }

    getDataInIndex(index){ 
        return this.itemManager.getDataInIndex(index)
    }

    getDoneInIndex(index){
        return this.itemManager.getDoneInIndex(index)
    }

    editDataInIndex(value, index){
        return this.itemManager.editDataInIndex(value, index)
    }

    clearAllTodos(){
        this.itemManager.clearAllTodos()
        alert("all todos cleared")
    }

    orderDataAlphabetically() {
        this.itemManager.orderDataAlphabetically()
    }

    orderDataAlphabeticallyReverse() {
        this.itemManager.orderDataAlphabeticallyReverse()
    }

    orderUnDoneToDone() {
        this.itemManager.orderUnDoneToDone()
    }

    orderDoneToUnDone(){
        this.itemManager.orderDoneToUnDone()
    }

    changeDoneStatus(index, status) {
        if(status){
            return this.itemManager.checkTodo(index)
        }
        else{
            return this.itemManager.uncheckTodo(index)
        }
    }

    getDoneTodos(){
        return this.itemManager.getDoneTodos()
    }

    getUnDoneTodos(){
        return this.itemManager.getUnDoneTodos()
    }
}

document.addEventListener("DOMContentLoaded", function() {
    onDOMReady();
})

function onDOMReady() {
    const addTodoButton = document.getElementById("add-todo-button")
    const todoInput = document.getElementById("todo-input")
    const clearAllTodosButton = document.getElementById("clear-all-todos-button")
    const orderSelect = document.getElementById("order-select")

    const main = new Main();
    main.showTodos()

    todoInput.addEventListener('keyup', (e) => {
        let enterValue = e.target.value
        const ENTER_KEY = 13
        const inputIsNotEmpty = enterValue.trim() !== ""
        const enterKeyPressed = e.keyCode === ENTER_KEY
    
        if (inputIsNotEmpty){
            handleButtonWhenInputIsEmpty()
    
            if(enterKeyPressed){
                main.addTodo()
            }
        }
        else{
            handleButtonWhenInputIsNotEmpty()
        }
    })

    addTodoButton.addEventListener("click", () => {
        main.addTodo()
    })
    
    clearAllTodosButton.addEventListener("click", () => {
        main.clearAllTodos()
    }) 
    
    orderSelect.addEventListener('change', (e) => {
        if(e.target.value === "A-Z") {
            main.filterDataAToZ()
        }
        else{
            main.filterDataZToA()
        }
    })
}

function handleButtonWhenInputIsEmpty(){
    const addTodoButton = document.getElementById("add-todo-button")

    addTodoButton.classList.add("active")
    addTodoButton.style.cursor = "pointer"
    addTodoButton.style.opacity = 1
}

function handleButtonWhenInputIsNotEmpty() {
    const addTodoButton = document.getElementById("add-todo-button")

    addTodoButton.classList.remove("active")
    addTodoButton.style.opacity = 0.2
    addTodoButton.style.cursor = "not-allowed"
}