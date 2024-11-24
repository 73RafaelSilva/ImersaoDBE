import {getodosDados,criarPostagem, atualizarPostagem} from "../model/postagensModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function pegaPostagens(req, res){
    const postagens = await getodosDados();
    res.status(200).json(postagens);
    console.log("Alguém me acessou e pegou todos os dados");
};
export async function guardaPostagem(req,res){
    const novaPostagem = req.body;
    try{
        const postagemCriada = await criarPostagem(novaPostagem);
        res.status(200).json(postagemCriada);
        console.log("Alguem subiu uma postagem no banco chefia!")
    }catch(erro){
        console.log(erro.message);
        res.status(500).json({"erro":"Falha na requisição"});
    }
}
export async function uploadImagem(req,res){
    const novaPostagem = {
        descricao:"",
        urlImagem: req.file.originalname,
        altImagem: "",
    };
    try{
        const postagemCriada = await criarPostagem(novaPostagem);
        const imagemAtualizada = `uploads/${postagemCriada.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postagemCriada);
        console.log("Alguem subiu uma imagem no banco chefia!")
    }catch(erro){
        console.log(erro.message);
        res.status(500).json({"erro":"Falha na requisição"});
    }
}
export async function atualizaPostagem(req,res){
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;

    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            urlImagem: urlImg,
            descricao: descricao,
            altImagem: req.body.altImagem,
        }
        const postagemCriada = await atualizarPostagem(id, post);
        res.status(200).json(postagemCriada);
        console.log("Alguem alterou uma postagem no banco chefia!");
    }catch(erro){
        console.log(erro.message);
        res.status(500).json({"erro":"Falha na requisição"});
    }
}
