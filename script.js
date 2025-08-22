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

    taskList.addEventListener('dblclick', (event) => {
        const taskItem = event.target.closest('.task-item');
        if (!taskItem || !event.target.classList.contains('task-text')) return;

        const taskTextSpan = event.target;
        const currentText = taskTextSpan.textContent;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = currentText;
        editInput.className = 'edit-input';

        taskItem.replaceChild(editInput, taskTextSpan);
        editInput.focus();

        const saveChanges = () => {
            const newText = editInput.value.trim();
            taskTextSpan.textContent = newText || currentText;
            taskItem.replaceChild(taskTextSpan, editInput);
        };

        editInput.addEventListener('blur', saveChanges);

        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveChanges();
            }
        });
    });
});