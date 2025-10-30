import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


const dbConfig = {
    host: process.env.HOST, // Endereço do servidor
    user: process.env.USER, // Usuário do banco
    password: process.env.PSSWD, // Senha do banco
    database: process.env.NAME, // Nome do banco de dados
    port: process.env.PORT_DB // Porta do MySQL (padrão 3306)
};

export async function connection() {
    try {
        const connection = await mysql2.createConnection(dbConfig);
        console.log('Conectado ao MySQL');
        return connection;
    }catch (error) {
        console.error('Erro ao conectar ao meuBanco >:(', error.message);
        throw error;
    }
}

export default connection;