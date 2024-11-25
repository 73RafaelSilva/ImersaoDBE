import { MongoClient } from 'mongodb';

// Conecta ao banco de dados MongoDB
export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        // Cria um cliente MongoDB
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        // Tenta conectar ao banco de dados
        await mongoClient.connect();
        // Retorna feed-back positivo caso cliente conectado
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        return mongoClient;
    } catch (erro) {
        // Imprime uma mensagem de erro e encerra a aplicação
        console.error('Falha na conexão com o banco!', erro);
        process.exit();
    }
}