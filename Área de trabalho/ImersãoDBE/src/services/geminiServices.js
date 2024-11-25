import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa o modelo Gemini 1.5 Flash
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Gera uma descrição em português para uma imagem
export default async function gerarDescricaoComGemini(imageBuffer) {
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem";
  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    // Retorna a descrição gerada
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Imprime uma mensagem de erro e lança uma exceção
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}