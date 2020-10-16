// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
var todo

// Event Listeners

todoButton.addEventListener('click', addTodo);

// Functions

function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Complete button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<img src="img/icons8-check-file-64.png" alt="completed">';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<img src="img/icons8-empty-trash-64.png" alt="completed">'
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Append to list
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}