import { Todo } from '../classes'
import {todoList} from '../index'
//html elements reference
const divList       = document.querySelector('.todo-list')
const inputTxt      = document.querySelector('.new-todo')
const btnDelete     = document.querySelector('.clear-completed')
const ulFilters     = document.querySelector('.filters')
const anchorFilters = document.querySelectorAll('.filtro')


export const createTodoHTML = (todo) =>{
    //string
    const htmlTodo = `
    <li class="${(todo.completed) ? 'completed':'' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completed) ? 'checked':'' }>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>    
    `
    //html element
    const div =  document.createElement('div')
    div.innerHTML = htmlTodo
    //node added
    divList.append(div.firstElementChild)

    return  div

}

inputTxt.addEventListener('keyup', (event)=>{

    console.log(event)
    
    if(event.keyCode == 13 && inputTxt.value.length > 0){
         const newTodo = new Todo(inputTxt.value)
         todoList.addTodo(newTodo)

         createTodoHTML(newTodo)
         inputTxt.value = ''
    }

})

divList.addEventListener('click', (event) => {
    const nameElement = event.target.localName
    const todoElement = event.target.parentElement.parentElement
    const todoId = todoElement.getAttribute('data-id')

    if(nameElement.includes('input')){
        todoList.toggleTaskDone(todoId)
        todoElement.classList.toggle('completed')
    }else if(nameElement.includes('button')){
        todoList.deleteTodo(todoId)
        console.log(todoId)
        console.log(todoList)
        divList.removeChild(todoElement)
    }

})

btnDelete.addEventListener('click', () =>{

    todoList.deleteTasksDone()

    for (let i = divList.children.length -1; i >= 0; i--) {
        const element = divList.children[i];
        console.log(element)
        if(element.classList.contains('completed')){
            divList.removeChild(element)
        }
    }
})

ulFilters.addEventListener('click', (event)=>{
    const filter = event.target.text;

    if(!filter){return;}
    anchorFilters.forEach(elem => elem.classList.remove('selected'))

    event.target.classList.add('selected')

    for(let element of divList.children){
        
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        console.log(completed)

        switch (filter) {
            case 'Pendientes':
                if(completed){
                    element.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completed){
                    element.classList.add('hidden');
                }
                break
        
            // default:
            //     break;
        }
    }
})