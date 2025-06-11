document.addEventListener('DOMContentLoaded', function() {
const todoInput = document.getElementById('todo-input');

const addBtn = document.getElementById('submit-btn');

const todoList = document.getElementById('todo-list');

const taskCount = document.getElementById('task-count');

const clearButton = document.getElementById('clear-all')


loadTask();

addBtn.addEventListener('click',addTask);
todoInput.addEventListener('keydown',function(e){
if(e.key === 'Enter'){
    addTask();
    }
});

clearButton.addEventListener('click', clearAllTask);

function addTask(){
    const taskText = todoInput.value.trim();

    if(taskText === ''){
        alert('tolong masukkan list');
        return;
    }
}

// membuat Task Item

const li = document.createElement('li');
li.className = 'todoItem';


//membuat checkbox

const checkBox = document.createElement('input');
checkBox.type ='checkbox';
checkBox.className = 'taskCheckbox';
checkBox.addEventListener('change', function(){
    li.classList.toggle('completed' this.checked);
    updateTaskCount();
    saveTask();
});

// Create task text

const newSpan = document.createElement('span');
span.className ='taskText';
span.textContent = taskText;

//membuat tombol delete

const deleteBtn = document.createElement('button');
deleteBtn.className = 'delete-btn';
deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
deleteBtn.addEventListener('click', function(){
    li.remove();
    updateTaskCount();
    saveTask();
});

//memasukkan element kedalam li

li.appendChild(checkBox);
li.appendChild(newSpan);
li.appendChild(deleteBtn);

todoList.appendChild(li);

todoInput.value='';


updateTaskCount();
saveTask();


function updateTaskCount(){
    const totalTask = document.querySelectorAll('.todo-item').length;
    const completedTask = document.querySelectorAll('.todo-item.completed').length;
    taskCount.textContent = '${completedTask}/${totalTask} task completed';
}
function saveTask(){
    const tasks =[];
    document.querySelectorAll(.todo-item).forEach(item =>{
        tasks.push({
            Text: item.querySelector('.task-checkbox').checked
        });
    });
    localStorage.setitem('todoList',JSON.stringify(tasks));
}
function loadTasks(){
    const savedTasks = localStorage.getItem('todoList');
    if(savedTasks){
        JSON.parse(savedTasks).forEach(task=>

            const li = document.createElement('li');
            li.className ='todo-item';

            if(task.completed){
                li.classList.add('completed');
            }

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'task-checkbox';
            checkBox.checked = task.completed;
            checkBox.addEventListener('change', function(){
                li.classList.toggle('completed', this.checked);
                updateTaskCount();
                saveTask();
            });
            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '<i class="fasfa-trash"></i>';
            deleteBtn.addEventListener('click', function(){
                li.remove();
                updateTaskCount();
                saveTask();
            });

            li.appendChild(checkBox);
            li.appendChild(span);
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        )};
        updateTaskCount();
}
}
function clearAllTask(){
    if(confirm('apakah kamu yakin.?')){
        todoList.innerHTML ='';
updateTaskCount();
localStorage.removeItem('todoList');
    }
});

