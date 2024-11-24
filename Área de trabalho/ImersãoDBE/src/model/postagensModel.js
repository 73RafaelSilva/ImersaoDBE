import 'dotenv/config';
import conectarAoBanco from "../config/dbconfig.js";
import { ObjectId } from "mongodb";

// Conecta ao banco de dados utilizando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os dados da coleção "postagens" no banco de dados
export async function getodosDados() {
    const db = conexao.db("imersao_dbe"); // Seleciona o banco de dados
    const colecao = db.collection("postagens"); // Seleciona a coleção
    return colecao.find().toArray(); // Retorna um array com todos os documentos da coleção
}
export async function criarPostagem(novaPostagem){
    const db = conexao.db("imersao_dbe"); // Seleciona o banco de dados
    const colecao = db.collection("postagens"); // Seleciona a coleção
    return colecao.insertOne(novaPostagem); 
}
export async function atualizarPostagem(id, novaPostagem){
    const db = conexao.db("imersao_dbe"); // Seleciona o banco de dados
    const colecao = db.collection("postagens"); // Seleciona a coleção
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)},{$set: novaPostagem}); 
}