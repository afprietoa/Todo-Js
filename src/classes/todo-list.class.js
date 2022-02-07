
export class TodoList{
    constructor(){
        
        this.loadLocalStorage()
    }

    addTodo(todo){
        this.todos.push(todo)
        this.saveLocalStorage()
    }
    deleteTodo(id){
        this.todos =  this.todos.filter( todo => todo.id != id)
        this.saveLocalStorage()
    }
    toggleTaskDone(id){
        for(let todo of this.todos){
            if(todo.id == id){
                todo.completed = !todo.completed
                this.saveLocalStorage()
                break;
            }
            
        }
    }
    deleteTasksDone(){
        this.todos =  this.todos.filter( (todo) => !todo.completed)
        this.saveLocalStorage()
    }
    saveLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos))
    }
    loadLocalStorage(){
        this.todos = ( localStorage.getItem('todo')) 
        ? JSON.parse(localStorage.getItem('todo'))
       : [] ;
    }
}