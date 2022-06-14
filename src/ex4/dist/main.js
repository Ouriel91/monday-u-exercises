import ItemClient from './clients/item-client.js'

export default class Main{
    constructor(){
        this.itemClient = new ItemClient()
        this.todoList = []
    }

    showTodos() {
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
        
        todoInput.value = "" //clear input
    }

    createItemsByCurrentData(){
        const todoListElement = document.getElementById("todo-list")

        this.createListItems().then((listItems) => {
            todoListElement.innerHTML = listItems
            this.showMatchUiByTodosNumber() 
            this.createItemsFuctionality()
        })
    }

    async createListItems(){
        let listItems = ""

        this.todoList = await this.itemClient.getTodoList()

        this.todoList.forEach((todo) => { 
            listItems += 
            `<li class="todo-item">
                <div class="todo-title">${todo.title}</div>
                <div class="actions">
                    <div>
                        <span class="action-btn delete">
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                    <div>
                        <span class="action-btn edit">
                            <i class="fas fa-edit"></i>
                        </span>
                    </div>
                </div>
            </li>
            `
        })

        return listItems
    }

    async createItemsFuctionality(){
        const deleteItems = document.querySelectorAll(".delete")
        const editItems = document.querySelectorAll(".edit")
        const todos = document.querySelectorAll(".todo-title")

        deleteItems.forEach((item, index) => {
            item.addEventListener("click", () => this.deleteTodo(index))
        })

        editItems.forEach((item, index) => {
            item.addEventListener("click", async() => {
                const data = todos[index].textContent
                let value = prompt("change this todo to regular todo", data)
                if(value === null){
                    return
                }
                await this.editDataInIndex(value, index)
            })
        })
    }


    async deleteTodo(index){
        const removedTodo = await this.itemClient.deleteTodo(index)
        this.showTodos()
        alert(`removed new todo ${removedTodo}`) 
    }

    async addTodo(){
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
        
        await this.itemClient.addTodo(enterValue)
        this.showTodos()
        addTodoButton.classList.remove("active")
    }

    getDataInIndex(index){     
        return this.itemClient.getSingleTodo(index)
    }

    getDoneInIndex(index){
        //return this.itemManager.getDoneInIndex(index)
    }

    async editDataInIndex(value, index){
        const editedData = await this.itemClient.editTodoIndex(value, index)
        console.log(editedData)
        alert(`data edited to ${editedData}`)
        this.showTodos()
    }

    async clearAllTodos(){
        /* await this.itemClient.clearAllTodoList()
        alert("all todos cleared")
        this.showTodos() */
    }

    orderDataAlphabetically() {
        //this.itemManager.orderDataAlphabetically()
    }

    orderDataAlphabeticallyReverse() {
        //this.itemManager.orderDataAlphabeticallyReverse()
    }

    orderUnDoneToDone() {
        //this.itemManager.orderUnDoneToDone()
    }

    orderDoneToUnDone(){
        //this.itemManager.orderDoneToUnDone()
    }

    changeDoneStatus(index, status) {
        if(status){
            //return this.itemManager.checkTodo(index)
        }
        else{
            //return this.itemManager.uncheckTodo(index)
        }
    }

    getDoneTodos(){
        //return this.itemManager.getDoneTodos()
    }

    getUnDoneTodos(){
        //return this.itemManager.getUnDoneTodos()
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