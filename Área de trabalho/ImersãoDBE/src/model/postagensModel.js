import 'dotenv/config';
import conectarAoBanco from "../config/dbconfig.js";
import { ObjectId } from "mongodb";

// Conecta ao banco de dados
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Obtém todas as postagens
export async function getodosDados() {
  const db = conexao.db("imersao_dbe");
  const colecao = db.collection("postagens");
  return colecao.find().toArray();
}

// Cria uma nova postagem
export async function criarPostagem(novaPostagem) {
  const db = conexao.db("imersao_dbe");
  const colecao = db.collection("postagens");
  return colecao.insertOne(novaPostagem);
}

// Atualiza uma postagem existente
export async function atualizarPostagem(id, novaPostagem) {
  const db = conexao.config("imersao_dbe");
  const colecao = db.collection("postagens");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novaPostagem });
}