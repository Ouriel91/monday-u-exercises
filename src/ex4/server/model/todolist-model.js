import fs from 'fs';
import * as url from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path'

export default class TodoListModel {
    constructor() {
        this.todoList = []
    }

    loadDataFromFile(){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        
        try {
            const data = fs.readFileSync(`${__dirname}/todo.json`, 'utf8');
            if(data === null){
                this.todoList = []
            }
            else{
                this.todoList = JSON.parse(data)
            } 
        } catch (err) {
            console.error(err);
        }
    }

    addData(enterValue){
        this.todoList.push(enterValue)
    }

    removeData(index){
        let copyArr = this.todoList
        copyArr.splice(index,1)
        this.todoList = copyArr
    }

    saveDataToFile(){ 
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        fs.writeFile(`${__dirname}/todo.json`, JSON.stringify(this.todoList), err => {
            if(err) {
                console.log(err)
            }
        })
    }

    clearAllData(){
        this.todoList = []
    }

    orderDataAlphabetically(){
        this.todoList = TodoListModel.compareFunc(this.todoList,"title")
    }

    orderDataAlphabeticallyReverse(){
        this.todoList = TodoListModel.compareFunc(this.todoList,"title").reverse()
    }

    orderUnDoneToDone(){
        this.todoList = TodoListModel.compareFunc(this.todoList,"done")
    }

    orderDoneToUnDone(){
        this.todoList = TodoListModel.compareFunc(this.todoList,"done").reverse()
    }

    static compareFunc(array, key){
        let copyArr = array
        return copyArr.sort(function(a, b) {
            const x = a[key]; 
            const y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        })
    }

    checkUncheckTodo(index, status){
        this.todoList[index].done = status

        return this.todoList[index]
    }

    getDoneTodos() {
       return TodoListModel.getDoneUnTodos(true, this.todoList)
    }

    getUnDoneTodos(){
       return TodoListModel.getDoneUnTodos(false, this.todoList)
    }

    static getDoneUnTodos(value, list){
        const copyArr = list
        const filteredArr = copyArr.filter(todo => todo.done === value)

        return filteredArr
    }

    editDataInIndex(value, index){
        this.todoList[index].title = value
        //for now is change to normal todo
        this.todoList[index].isPokemon = false
        this.todoList[index].imagePokemonPath = null

        return this.todoList[index]
    }
}