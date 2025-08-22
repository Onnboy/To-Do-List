const API_URL = 'http://localhost:3000/tasks';

/**
 * @returns {Promise<Array>}
 */
const getTasks = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Falha ao buscar tarefas da API:", error);
        return [];
    }
};

/**
 * @param {object} taskData
 * @returns {Promise<object|null>}
 */
const createTask = async (taskData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar tarefa: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao criar tarefa:", error);
        return null;
    }
};

/**
 * Remove uma tarefa do servidor.
 * @param {string|number} taskId - O ID da tarefa a ser removida.
 * @returns {Promise<boolean>} Uma promessa que resolve para `true` se a remoção for bem-sucedida, ou `false` em caso de erro.
 */
const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao remover tarefa: ${response.statusText}`);
        }
        return true; // Indica sucesso
    } catch (error) {
        console.error("Falha ao remover tarefa:", error);
        return false; // Indica falha
    }
};