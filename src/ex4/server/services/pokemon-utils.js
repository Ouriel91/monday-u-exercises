export async function handleAddSingleOrMultiPokemonsTodo(model,pokemonClient, enterValue){

    if(enterValue.includes(",")){
        await handleAddMultiPokemonsTodo(model, pokemonClient, enterValue)
    }
    else {
        await handleAddSinglePokemonTodo(model, pokemonClient, enterValue)
    }
}

async function handleAddMultiPokemonsTodo(model, pokemonClient, enterValue){

    const split = enterValue.split(",")
    const pokemonArr = []

    for(let i = 0; i < split.length; i++){
        pokemonArr.push(pokemonClient.fetchMulti(trim(split[i])))
    }

    return Promise.all(pokemonArr)
        .then(response => {
            response.forEach(res => {
                addMultiplePokemonsTodo(res, pokemonClient, model)
        })
        updateTodos(model)
    }).catch(error => {
        console.log(error)
        addFailToLoadPokemonsTodo(enterValue, model)
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
    const id = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    model.addData({title: value, done: false, isPokemon, imagePokemonPath, id})
}

function addFailToLoadPokemonsTodo(enterValue, model) {
    const isPokemon = false
    const imagePokemonPath = null
    const value = `failed to fetch pokemon with this input: ${enterValue}`
    addTodoParse(model, value, isPokemon, imagePokemonPath)
    updateTodos(model)
}

function updateTodos(model){
    model.saveDataToFile()
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

function trim(value) {
    return value.replace(/^\s+|\s+$/g,"");
}