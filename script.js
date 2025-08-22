document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item pending';

            const taskTextSpan = document.createElement('span');
            taskTextSpan.className = 'task-text';
            taskTextSpan.textContent = taskText;
            taskItem.appendChild(taskTextSpan);

            taskList.appendChild(taskItem);
        }
    });
    taskList.addEventListener('click', (event) => {
        const taskItem = event.target.closest('.task-item');

        if (taskItem) {
            taskItem.classList.toggle('done');
            taskItem.classList.toggle('pending');
        }
    });
});

