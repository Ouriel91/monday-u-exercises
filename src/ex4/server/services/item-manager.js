// The ItemManager should go here. Remember that you have to export it.

import TodoListModel from "../model/todolist-model.js"
import PokemonClient from "../clients/pokemon-client.js"
import {handleAddSingleOrMultiPokemonsTodo} from './pokemon-utils.js'

const singleNumber = /^\d+$/
const singleWord = /^[A-Za-z]+$/
const multiNumbersSeparatedWithComma = /^\d+(,\d+)*$/

export default class ItemManager {
    constructor(main){
        this.pokemonClient = new PokemonClient()
        this.model = new TodoListModel()
        this.model.loadDataFromFile()
        this.main = main;
    }

    async addTodo(enterValue){
        const trimValue = ItemManager.trim(enterValue)
        if(trimValue === "") return

        await this.handleInputToAdd(trimValue)
    }

    async handleInputToAdd(trimValue){
        const partOfNumbersSeprateWithComma = 
            trimValue.substring(0,1).match(multiNumbersSeparatedWithComma)

        const singleNumberPattern = trimValue.match(singleNumber)
        const singleWordPattern = trimValue.match(singleWord)
        const multiNumberPattern = trimValue.match(multiNumbersSeparatedWithComma) 
    
        if(singleWordPattern !== null || 
                singleNumberPattern !== null || 
                    multiNumberPattern !== null || 
                        partOfNumbersSeprateWithComma !== null) {
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
        const id = Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
        this.model.addData({title: value, done: false, isPokemon, imagePokemonPath, id})
    }

    static trim(value) {
        return value.replace(/^\s+|\s+$/g,"");
    }

    deleteTodo(id) {
        const index = this.model.todoList.findIndex(item => item.id === id);
        if(index === -1){
            return null;
        }
    
        const removedTodo = this.model.todoList[index]
        this.model.removeData(index)
        this.updateTodos()

        return removedTodo
    }

    updateTodos(){
        this.model.saveDataToFile()
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
            return null;
        }
    
        const todo = this.model.checkUncheckTodo(index,true)
        this.updateTodos()
        return todo
    }

    uncheckTodo(id) {
        const index = this.model.todoList.findIndex(item => item.id === id)
        if(index === -1){
            return null;
        }

        const todo = this.model.checkUncheckTodo(index, false)
        this.updateTodos()
        return todo
    }

    editDataInIndex(value, id){
        const index = this.model.todoList.findIndex(item => item.id === id)
        if(index === -1){
            return null;
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