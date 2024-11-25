import express from "express";
import multer from "multer";
import cors from "cors";
import { pegaPostagens, guardaPostagem, uploadImagem, atualizaPostagem } from "../controllers/postagensControllers.js";

// CORS para localhost:8000
const corsOptions = { origin: "http://localhost:8000" };

// Armazena uploads na pasta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

// Upload de imagens únicas
const upload = multer({ dest: "./uploads" });

// Define rotas
const route = (app) => {
  app.use(express.json()); // Aceita JSON no corpo da requisição
  app.use(cors(corsOptions)); // Habilita CORS
  // GET /dados: Busca posts
  app.get("/dados", pegaPostagens);
  // POST /dados: Cria post
  app.post("/dados", guardaPostagem);
  // POST /upload: Envia imagem (campo único "imagem")
  app.post("/upload", upload.single("imagem"), uploadImagem);
  // PUT /upload/:id: Atualiza post
  app.put("/upload/:id", atualizaPostagem)
};

export default route;
