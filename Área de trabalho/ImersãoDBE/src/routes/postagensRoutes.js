import express from "express";
import multer from "multer";
import cors from "cors";
import { pegaPostagens, guardaPostagem, uploadImagem, atualizaPostagem } from "../controllers/postagensControllers.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({dest:"./uploads"})

const route = (app)=>{
    // Habilita o parsing de JSON no corpo das requisições
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota para obter todos os dados da coleção "postagens"
    app.get("/dados", pegaPostagens);
    app.post("/dados", guardaPostagem);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", atualizaPostagem);
};


export default route;