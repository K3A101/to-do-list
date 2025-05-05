let socket = io();
let tasksListContainer = document.querySelector('.tasks-list');
let input = document.querySelector('#task_input');
let form = document.querySelector('form.task-form');
let progressBar = document.querySelector('.progress-bar');
let finishBtn = document.querySelector('.finish-button');


function renderTasks(tasks) {
    tasksListContainer.innerHTML = '';
    let completedCount = 0;

    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.classList.add('list');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            socket.emit('toggleTask', index);
        });

        if (task.completed) {
            li.classList.add('completed');
            completedCount++;
        }

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.text));
        tasksListContainer.appendChild(li);
    });

    let percent = tasks.length ? (completedCount / tasks.length) * 100 : 0;
    progressBar.style.width = percent + '%';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value.trim()) {
        socket.emit('addTask', input.value.trim());
        input.value = '';
    }
});

socket.on('initialTasks', (tasks) => {
    renderTasks(tasks);
});

socket.on('tasks', (tasks) => {
    renderTasks(tasks);
});

finishBtn.addEventListener('click', () => {
    socket.emit('resetTasks');
});
