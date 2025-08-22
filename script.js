document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- TASK 8: FUNÇÕES DE PERSISTÊNCIA ---

    // Função para salvar o estado atual da lista do DOM para o Local Storage
    const saveTasksToLocalStorage = () => {
        const tasks = [];
        // Itera sobre todos os <li> na lista
        document.querySelectorAll('#task-list .task-item').forEach(taskItem => {
            const textSpan = taskItem.querySelector('.task-text');
            if (textSpan) { // Garante que o span de texto exista
                tasks.push({
                    text: textSpan.textContent,
                    done: taskItem.classList.contains('done')
                });
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Função para carregar as tarefas do Local Storage e recriá-las no DOM
    const loadTasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        savedTasks.forEach(task => {
            // Reusa a lógica de criação de tarefa, mas com os dados salvos
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.done ? 'done' : 'pending'}`;

            const taskTextSpan = document.createElement('span');
            taskTextSpan.className = 'task-text';
            taskTextSpan.textContent = task.text;
            taskItem.appendChild(taskTextSpan);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remover';
            taskItem.appendChild(removeBtn);

            taskList.appendChild(taskItem);
        });
    };

    // Carrega as tarefas salvas assim que a página é carregada
    loadTasksFromLocalStorage();

    // --- LISTENERS DE EVENTOS EXISTENTES (MODIFICADOS PARA SALVAR) ---

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

            // Limpa o input
            taskInput.value = '';
            taskInput.focus();

            // Salva o estado após adicionar
            saveTasksToLocalStorage();
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
        // Salva o estado após remover ou marcar/desmarcar
        saveTasksToLocalStorage();
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
            // Salva o estado após editar
            saveTasksToLocalStorage();
        };

        editInput.addEventListener('blur', saveChanges);

        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveChanges();
            }
        });
    });
});