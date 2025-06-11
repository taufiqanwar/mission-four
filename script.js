document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');
    const clearAllBtn = document.getElementById('clear-all');
    
    // Load tasks from localStorage
    loadTasks();
    
    // Add task
    addBtn.addEventListener('click', addTask);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Clear all tasks
    clearAllBtn.addEventListener('click', clearAllTasks);
    
    function addTask() {
        const taskText = todoInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        
        // Create new task item
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.addEventListener('change', function() {
            li.classList.toggle('completed', this.checked);
            updateTaskCount();
            saveTasks();
        });
        
        // Create task text
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', function() {
            li.remove();
            updateTaskCount();
            saveTasks();
        });
        
        // Append elements to li
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        // Add to list
        todoList.appendChild(li);
        
        // Clear input
        todoInput.value = '';
        
        // Update count and save
        updateTaskCount();
        saveTasks();
    }
    
    function updateTaskCount() {
        const totalTasks = document.querySelectorAll('.todo-item').length;
        const completedTasks = document.querySelectorAll('.todo-item.completed').length;
        taskCount.textContent = `${completedTasks}/${totalTasks} tasks completed`;
    }
    
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.querySelector('.task-checkbox').checked
            });
        });
        localStorage.setItem('todoList', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('todoList');
        if (savedTasks) {
            JSON.parse(savedTasks).forEach(task => {
                // Create new task item
                const li = document.createElement('li');
                li.className = 'todo-item';
                
                if (task.completed) {
                    li.classList.add('completed');
                }
                
                // Create checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'task-checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', function() {
                    li.classList.toggle('completed', this.checked);
                    updateTaskCount();
                    saveTasks();
                });
                
                // Create task text
                const span = document.createElement('span');
                span.className = 'task-text';
                span.textContent = task.text;
                
                // Create delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                deleteBtn.addEventListener('click', function() {
                    li.remove();
                    updateTaskCount();
                    saveTasks();
                });
                
                // Append elements to li
                li.appendChild(checkbox);
                li.appendChild(span);
                li.appendChild(deleteBtn);
                
                // Add to list
                todoList.appendChild(li);
            });
            
            updateTaskCount();
        }
    }
    
    function clearAllTasks() {
        if (confirm('Are you sure you want to delete all tasks?')) {
            todoList.innerHTML = '';
            updateTaskCount();
            localStorage.removeItem('todoList');
        }
    }
});