const form = document.querySelector('.todo-form');
const list = document.querySelector('.todo-items');
const add = document.querySelector('#btn-add');
const input = document.querySelector('#input');
let todos = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(input.value);
});

function addTodo(item) {
    if(item !== ''){
        const todo = {
            id : Date.now(),
            name : item,
            completed : false,
        }
        todos.push(todo);
        addToLocalStorage(todos);
        input.value = null;
    }

}

function displayTodo(todos) {
    list.innerHTML = '';
    todos.forEach(function(item) {
    const checked  = item.completed ? 'checked' : null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);

    if(item.completed === true){
        li.classList.add('checked');
    }
    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="btn-delete">X</button>
    `;
    list.append(li);
});
}

function toggle(id){
    todos.forEach(function(item) {
    if (item.id == id)
        item.completed = !item.completed;
    });
    addToLocalStorage(todos);
}

function deleteItem(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}


function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodo(todos);
}

function getFromLocalStorage(todos) {
    const reference = localStorage.getItem('todos');
    if(reference) {
        todos = JSON.parse(reference);
        displayTodo(todos);
    }
}

getFromLocalStorage();

list.addEventListener('click', (e)=>{
    if(e.target.type === 'checkbox')
    toggle(e.target.parentElement.getAttribute('data-key'));

    if(e.target.classList.contains('btn-delete'))
    deleteItem(e.target.parentElement.getAttribute('data-key'));
});


