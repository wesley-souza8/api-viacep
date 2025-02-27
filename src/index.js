// Importando as bibliotecas
const express = require('express'); //biblioteca para criação do servidor
const axios = require('axios'); //biblioteca para realizar as requisições, nos padrões do http

const app = express();

const PORT = 3000; // Sinalizando a porta que será trabalhada

// Endpoint para buscar o endereço pelo CEP

app.get('/cep/:cep', async (req, res) => {
    
    const { cep } = req.params;

    try{
        // Fazendo a requisição para a API ViaCEP
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); // sinalizando para bibliteca que espera a resposta da api para continuar no código

        const endereco = response.data;

        // Se o CEP não for encontrado
        if (endereco.erro) {

            return res.status(404).json({mensagem: 'CEP não encontrado'}); // Biblioteca axios
            
        }

        // Retorna o endereco formatado
        res.json({
            cep: endereco.cep,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf
        });

    } catch (error) {

        // Retorno de erro caso não consiga se conectar com o servidor
        res.status(500).json({ mensagem: 'Erro ao consultar o CEP' });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});