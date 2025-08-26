document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const todoList = document.getElementById('todo-list');
    const taskCounter = document.getElementById('task-counter');
    const doneList = document.getElementById('done-list');
    const kanbanBoard = document.getElementById('kanban-board');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    let tasksState = [];

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeToggle.checked = false;
        }
    };

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    const updateTaskCounter = () => {
        const totalTasks = tasksState.length;
        const pendingTasks = tasksState.filter(task => !task.done).length;

        if (totalTasks === 0) {
            taskCounter.textContent = 'Nenhuma tarefa na lista.';
        } else {
            taskCounter.textContent = `${pendingTasks} pendente(s) de ${totalTasks} no total`;
        }
    };

    const renderAllTasks = () => {
        todoList.innerHTML = '';
        doneList.innerHTML = '';

        tasksState.forEach(task => {
            const taskElement = createTaskElement(task);
            if (task.done) {
                doneList.appendChild(taskElement);
            } else {
                todoList.appendChild(taskElement);
            }
        });
        updateTaskCounter();
    };

    /**
     * @param {object} task
     * @returns {HTMLElement}
     */
    const createTaskElement = (task) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;
        if (task.done) {
            li.classList.add('done');
        }

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remover';

        li.appendChild(span);
        li.appendChild(removeBtn);

        return li;
    };

    const initializeApp = async () => {
        tasksState = await getTasks();
        renderAllTasks();
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (!text) return;

        const createdTask = await createTask({ text, done: false });
        if (createdTask) {
            tasksState.push(createdTask);
            renderAllTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    };

    const handleListClick = (e) => {
        const taskElement = e.target.closest('.task-item');
        if (!taskElement) return;

        if (e.target.classList.contains('remove-btn')) {
            // Ação de remover é imediata
            const taskId = taskElement.dataset.id;
            if (window.confirm('Tem certeza que deseja remover esta tarefa?')) {
                deleteTask(taskId).then(success => {
                    if (success) {
                        tasksState = tasksState.filter(t => t.id !== taskId);
                        renderAllTasks();
                    }
                });
            }
        } else if (e.target.classList.contains('task-text')) {
            // Lógica para diferenciar clique simples de duplo
            const clicks = parseInt(taskElement.dataset.clicks || '0', 10) + 1;
            taskElement.dataset.clicks = clicks;

            if (clicks === 1) {
                setTimeout(() => {
                    if (taskElement.dataset.clicks === '1') {
                        // Ação de clique simples (marcar/desmarcar)
                        const taskId = taskElement.dataset.id;
                        const task = tasksState.find(t => t.id === taskId);
                        if (task) {
                            const updatedTaskData = { ...task, done: !task.done };
                            updateTask(taskId, updatedTaskData).then(updatedTask => {
                                if (updatedTask) {
                                    tasksState = tasksState.map(t => t.id === taskId ? updatedTask : t);
                                    renderAllTasks();
                                }
                            });
                        }
                    }
                    delete taskElement.dataset.clicks;
                }, 250); // Atraso para esperar por um possível segundo clique
            } else if (clicks === 2) {
                // Ação de clique duplo (editar)
                delete taskElement.dataset.clicks;
                handleDoubleClickEdit(e.target);
            }
        }
    };

    const handleDoubleClickEdit = (spanElement) => {
        const taskElement = spanElement.closest('.task-item');
        const originalText = spanElement.textContent;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = originalText;

        spanElement.replaceWith(input);
        input.focus();

        const saveChanges = async () => {
            const newText = input.value.trim();
            const taskId = taskElement.dataset.id;
            const task = tasksState.find(t => t.id === taskId);

            if (newText && newText !== originalText && task) {
                const updatedTask = await updateTask(taskId, { ...task, text: newText });
                tasksState = tasksState.map(t => t.id === taskId ? updatedTask : t);
            }
            renderAllTasks();
        };

        input.addEventListener('blur', saveChanges);
        input.addEventListener('keydown', (event) => event.key === 'Enter' && input.blur());
    };

    taskForm.addEventListener('submit', handleAddTask);
    kanbanBoard.addEventListener('click', handleListClick);

    initializeApp();
});