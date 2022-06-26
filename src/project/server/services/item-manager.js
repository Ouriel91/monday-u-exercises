import TodoListModel from "../model/todolist-model.js"
import PokemonClient from "../clients/pokemon-client.js"
import {handleAddSingleOrMultiPokemonsTodo} from './pokemon-helpers.js'
import {generateUniqueId} from './generate-uninque-id.js'
import {inputValidator} from './input-validataion.js'

export default class ItemManager {
    constructor(main){
        this.pokemonClient = new PokemonClient()
        this.model = new TodoListModel()
        this.model.loadData()
        this.main = main;
    }

    async addTodo(enterValue){
        const trimValue = ItemManager.sanitize(enterValue)
        if(trimValue === "") return

        await this.handleInputToAdd(trimValue)
    }

    async handleInputToAdd(trimValue){
       
        if(inputValidator(trimValue)) {
            await handleAddSingleOrMultiPokemonsTodo(this.model, this.pokemonClient, trimValue)
        }
        else{ //noraml todo
            const isPokemon = false
            const imagePokemonPath = null
            this.addTodoParse(trimValue, isPokemon, imagePokemonPath)
            this.updateTodos()
        }
    }

    addTodoParse(value, isPokemon, imagePokemonPath){
        //generate unique id
        const id = generateUniqueId()
        this.model.addTodo({title: value, done: false, isPokemon, imagePokemonPath, id})
    }

    static sanitize(value) {
        return value.replace(/^\s+|\s+$/g,"");
    }

    deleteTodo(id) {
        const index = this.model.todoList.findIndex(item => item.id === id);
        if(index === -1){
            throw new Error("Invalid id to delete")
        }
    
        const removedTodo = this.model.todoList[index]
        this.model.removeData(index)
        this.updateTodos()

        return removedTodo
    }

    updateTodos(){
        this.model.saveData()
    }

    clearAllTodos() {
        this.model.clearAllData()
        this.updateTodos()
    }

    orderDataAlphabetically() {
        this.model.orderDataAlphabetically()
        this.updateTodos()
    }

    orderDataAlphabeticallyReverse() {
        this.model.orderDataAlphabeticallyReverse()
        this.updateTodos()
    }

    checkTodo(id) {
        const index = this.model.todoList.findIndex(item => item.id === id)
        if(index === -1){
            throw new Error("Invalid id to check")
        }
    
        const todo = this.model.checkUncheckTodo(index,true)
        this.updateTodos()
        return todo
    }

    uncheckTodo(id) {
        const index = this.model.todoList.findIndex(item => item.id === id)
        if(index === -1){
            throw new Error("Invalid id to uncheck")
        }

        const todo = this.model.checkUncheckTodo(index, false)
        this.updateTodos()
        return todo
    }

    editDataInIndex(value, id){
        const index = this.model.todoList.findIndex(item => item.id === id)
        if(index === -1){
            throw new Error("Invalid id to edit")
        }
        
        const todo = this.model.editDataInIndex(value, index)
        this.updateTodos()
        return todo
    }

    orderUnDoneToDone(){
        this.model.orderUnDoneToDone()
        this.updateTodos()
    }

    orderDoneToUnDone(){
        this.model.orderDoneToUnDone()
        this.updateTodos()
    }

    getDoneTodos() {
        return this.model.getDoneTodos()
    }

    getUnDoneTodos(){
        return this.model.getUnDoneTodos()
    }

    todoListSize() {
        return this.getTodoList().length
    }

    getTodoList() {
        return this.model.todoList
    }
}
