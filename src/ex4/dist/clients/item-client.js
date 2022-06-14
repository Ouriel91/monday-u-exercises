// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
const SERVER_URL = 'http://localhost:8080/todo/'
export default class ItemClient {

    async getTodoList(){
        const response = await fetch(SERVER_URL)
        const data = await response.json()

        return data
    }

    async addTodo(value) {
        const response = await fetch(SERVER_URL, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({todo: value})
        })

        const data = await response.json()
        console.log("add",data)
    }

    async deleteTodo(index){
        const response = await fetch(`${SERVER_URL}${index}`, 
        {method: 'DELETE'})
        const data = await response.json()
        return data.title
    }

    async getSingleTodo(index){
        const response = await fetch(`${SERVER_URL}${index}`)
        const data = await response.json()
        
        return data.todo
    }

    async editTodoIndex(value,index){
        const response = await fetch(`${SERVER_URL}${index}`, 
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({todo: value})
        })
        const data = await response.json()

        return data.todo
    }

    async clearAllTodoList(){
       /*  console.log("item client clear")
        const response = await fetch(`${SERVER_URL}clear`)
        console.log("resp", response)
        const data = await response.json() */
        
    }
}

