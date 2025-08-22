// Substitua esta URL pela URL real da API fornecida no seu curso.
const API_URL = 'https://api.example.com/tasks';

/**
 * Busca todas as tarefas do servidor.
 * Usa async/await para lidar com a natureza assíncrona do fetch.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de tarefas.
 */
const getTasks = async () => {
    try {
        // 1. Faz a requisição GET para a API. 'await' pausa a função até a resposta chegar.
        const response = await fetch(API_URL);

        // 2. Verifica se a resposta da rede foi bem-sucedida (status 2xx).
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // 3. Converte a resposta em JSON e a retorna.
        return await response.json();
    } catch (error) {
        console.error("Falha ao buscar tarefas da API:", error);
        return []; // Retorna um array vazio em caso de erro para não quebrar a aplicação.
    }
};