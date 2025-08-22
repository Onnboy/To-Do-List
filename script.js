document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;
            taskList.appendChild(taskItem);

            taskInput.value = '';
            taskInput.focus();
        }
    });
});

