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

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remover';
            taskItem.appendChild(removeBtn);

            taskList.appendChild(taskItem);
        }
    });
    taskList.addEventListener('click', (event) => {
        const taskItem = event.target.closest('.task-item');
        if (!taskItem) return;

        if (event.target.classList.contains('remove-btn')) {
            taskItem.remove();
        } else {
            taskItem.classList.toggle('done');
            taskItem.classList.toggle('pending');
        }
    });
});

