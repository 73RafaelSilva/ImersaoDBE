import express from "express";
import route from "./src/routes/postagensRoutes.js";

// Inicializa o servidor Express
const app = express();

// Serve arquivos estáticos da pasta 'uploads'
app.use(express.static("uploads"))

// Registra rotas de postagens
route(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log("Banco de dados na escuta chefia, servidor iniciado na porta 3000");
});
