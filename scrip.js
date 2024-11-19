'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');
let todoData = [];

let localMemory = function() {
    if (localStorage.getItem('Tasks') === null) {
        return;
    } else {
        todoData = JSON.parse(localStorage.getItem('Tasks'));
    }
};

localMemory();

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if(item.completed){
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        const btnTodoCompleted = li.querySelector('.todo-complete');

        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnDelete = li.querySelector('.todo-remove');

        btnDelete.addEventListener('click', function(){
            const index = todoData.indexOf(item);
            if (index > -1) {
                todoData.splice(index, 1);

                localStorage.setItem('Tasks', JSON.stringify(todoData));

            }
            render();
        });

    });

};

todoControl.addEventListener('submit', function(event){
    event.preventDefault()

    if (headerInput.value.trim() != ''){

        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);

        localStorage.setItem('Tasks', JSON.stringify(todoData));

        render();
        headerInput.value = '';
    }

});

render();