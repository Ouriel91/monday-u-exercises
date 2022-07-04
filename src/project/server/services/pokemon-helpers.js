import {generateUniqueId} from './generate-uninque-id.js'

export async function handleAddSingleOrMultiPokemonsTodo(model,pokemonClient, enterValue){

    if(enterValue.includes(",")){
        const split = enterValue.split(",")
        const pokemonArr = []

        for(let i = 0; i < split.length; i++){
            pokemonArr.push(pokemonClient.fetchMulti(sanitize(split[i])))
        }
        await handleAddMultiPokemonsTodo(model, pokemonClient,pokemonArr)
    }
    else {
        await handleAddSinglePokemonTodo(model, pokemonClient, enterValue)
    }
}

async function handleAddMultiPokemonsTodo(model, pokemonClient, pokemonArr){

    return Promise.all(pokemonArr)
        .then(response => {
            response.forEach(res => {
                addMultiplePokemonsTodo(res, pokemonClient, model)
        })
        updateTodos(model)
    }).catch(error => {
        console.log(error)
        addFailToLoadPokemonsTodo(pokemonArr, model)
    })
}

function addMultiplePokemonsTodo(res , pokemonClient, model) {
    const types = pokemonClient.getTypes(res)
    const dataRetrieved = pokemonClient.returnPokemonData(res, types)
    const {value, isPokemon, imagePokemonPath} = dataRetrieved
    addTodoParse(model, value, isPokemon, imagePokemonPath)
}

function addTodoParse(model, value, isPokemon, imagePokemonPath){
    //generate unique id
    const id = generateUniqueId()
    model.addTodo({title: value, done: false, isPokemon, imagePokemonPath, id})
}

function addFailToLoadPokemonsTodo(enterValue, model) {
    const isPokemon = false
    const imagePokemonPath = null
    const value = `failed to fetch pokemon with this input: ${enterValue}`
    addTodoParse(model, value, isPokemon, imagePokemonPath)
    updateTodos(model)
}

function updateTodos(model){
    model.saveData()
}

async function handleAddSinglePokemonTodo(model, pokemonClient, enterValue){
    
    const dataRetrieved = await pokemonClient.fetchSingle(enterValue)
    if(dataRetrieved){
        const {value, isPokemon, imagePokemonPath} = dataRetrieved
        addTodoParse(model, value, isPokemon, imagePokemonPath)
        updateTodos(model)
    }
    else {
        addFailToLoadPokemonsTodo(enterValue, model)
    }   
}

function sanitize(value) {
    return value.replace(/^\s+|\s+$/g,"");
}