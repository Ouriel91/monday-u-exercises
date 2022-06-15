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

        this.loaderActiveDeActive(true)
        this.todoList = await this.itemClient.getTodoList()

        this.todoList.forEach((todo) => { 
            let image = ""
            if(todo.isPokemon){
                image = `<img class="image" src="${todo.imagePokemonPath}" />`
            }

            let checked = `<input id="check-todo" type="checkbox">`
            if(todo.done){
                checked = `<input id="check-todo" type="checkbox" checked>`
            }
            listItems += 
            `<li class="todo-item">
                ${checked}
                <div class="todo-title">${todo.title}</div>
                ${image}
                <div class="actions">
                    <div>
                        <span class="action-btn delete" id=${todo.id}>
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                    <div>
                        <span class="action-btn edit" data-title="${todo.title}" id=${todo.id}>
                            <i class="fas fa-edit"></i>
                        </span>
                    </div>
                </div>
            </li>
            `
        })

        this.loaderActiveDeActive(false)

        return listItems
    }

    async createItemsFuctionality(){
        const deleteItems = document.querySelectorAll(".delete")
        const editItems = document.querySelectorAll(".edit")
        const todos = document.querySelectorAll(".todo-title")
        const checkTodos = document.querySelectorAll(".check-todo")

        deleteItems.forEach((item, index) => {
            item.addEventListener("click", () => this.deleteTodo(item.id))
        })

        editItems.forEach((item, index) => {
            item.addEventListener("click", async(e) => {
                const data = item.getAttribute("data-title")
                let value = prompt("change this todo to regular todo", data)
                if(value === null){
                    return
                }
                await this.editDataInIndex(value, item.id)
            })
        })
    }


    async deleteTodo(index){
        this.loaderActiveDeActive(true)
        const removedTodo = await this.itemClient.deleteTodo(index)
        this.loaderActiveDeActive(false)
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
        
        this.loaderActiveDeActive(true)
        await this.itemClient.addTodo(enterValue)
        this.loaderActiveDeActive(false)
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
        this.loaderActiveDeActive(true)
        const editedData = await this.itemClient.editTodoIndex(value, index)
        this.loaderActiveDeActive(false)
        alert(`data edited to ${editedData.title}`)
        this.showTodos()
    }

    async clearAllTodos(){
        const allItemsDeleteRoute = -1
        await this.itemClient.deleteTodo(allItemsDeleteRoute)
        alert("all todos cleared")
        this.showTodos()
    }

    orderDataAlphabetically() {
        /* this.itemClient.getTodoList("sort=atoz")
        this.showTodos() */
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

    loaderActiveDeActive(value){
        const loader = document.getElementById("loader")
        if(value){
            loader.style.display = "block"
        }
        else {
            loader.style.display = "none"
        }
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
            main.orderDataAlphabetically()
        }
        else{
            //main.filterDataZToA()
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