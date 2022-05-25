import Model from "./Model.js";

export default class ItemManager {
    constructor(pokemonClient){
        this.API_BASE = 'https://pokeapi.co/api/v2/pokemon/'
        this.model = new Model()
        this.model.LoadDataFromLS()
        this.pokemonClient = pokemonClient;
    }

    addTodo(enterValue){
        
        if(enterValue.trim() === ""){
            return
        }

        this.handleAddSingleOrMultiPokemonsTodo(enterValue)
    }

    handleAddSingleOrMultiPokemonsTodo(enterValue){

        if(enterValue.includes(",")){
            this.handleAddMultiPokemonsTodo(enterValue)
        }
        else {
            this.handleAddSinglePokemonTodo(enterValue)
        }
    }

    handleAddMultiPokemonsTodo(enterValue){

        const split = enterValue.split(",")
        const pokemonArr = []

        for(let i = 0; i < split.length; i++){
            pokemonArr.push(this.fetchMulti(split[i]))
        }

        Promise.all(pokemonArr)
            .then(response => {
                response.forEach(res => {
                    this.model.addData("catch " +res.name)
            })
            this.updateTodos()
        }).catch(error => {
            console.log(error)
            this.model.addData("failed to fetch pokemon with this input: " +enterValue)
            this.updateTodos()
        })
    }

    fetchMulti(pokemonName){
        return new Promise((resolve, reject) => {
            return fetch(this.API_BASE+pokemonName)
                .then(response => {
                    if(response.status === 200){
                        resolve(response.json())
                    }
                    else{
                        reject(response)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    async handleAddSinglePokemonTodo(enterValue){
        const dataRetrieved = await this.fetchSingle(enterValue)
        this.model.addData(dataRetrieved)
        this.updateTodos()
    }

    async fetchSingle(dataEntered){ 
        try{
            const response = await fetch(this.API_BASE+dataEntered)
            if(response.status === 404){
                return `pokemon id ${dataEntered} not found` 
            }
            const data = await response.json()

            return "catch " + data.name;
        }catch(error){
            console.log(error)
        }
    }

    deleteTodo(index) {
    
        const removedTodo = this.model.todoList[index]
        this.model.removeData(index)
        this.model.saveDataToLS()   

        return removedTodo
    }

    updateTodos(){
        this.model.saveDataToLS()
        this.pokemonClient.showTodos()
    }

    clearAllTodos() {
        this.model.clearAllData()
        this.updateTodos()
    }

    filterDataAToZ() {
        this.model.filterDataAToZ()
        this.updateTodos()
    }

    filterDataZToA() {
        this.model.filterDataZToA()
        this.updateTodos()
    }

    todoListSize() {
        return this.model.todoList.length
    }

    getTodoList() {
        return this.model.todoList
    }
}
