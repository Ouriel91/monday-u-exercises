// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
export default class ItemClient {

    async getTodoList(){
        const response = await fetch('http://localhost:8080/todo/')
        const data = await response.json()

        return data
    }

    async addTodo(value) {
        const response = await fetch('http://localhost:8080/todo', 
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
        const response = await fetch(`http://localhost:8080/todo/${index}`, 
        {method: 'DELETE'})
        const data = await response.json()
        console.log("delete",data)
        return data.title
    }

    async getSingleTodo(index){
        const response = await fetch(`http://localhost:8080/todo/${index}`)
        const data = await response.json()
        
        return data.todo
    }

    async editTodoIndex(value,index){
        const response = await fetch(`http://localhost:8080/todo/${index}`, 
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({todo: value})
        }
        )
        const data = await response.json()

        return data.todo
    }
}

