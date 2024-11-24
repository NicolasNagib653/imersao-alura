import express from "express"; // Importa o framework Express para criar o servidor web
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccesStatus: 200
}

// Importa funções para listar posts, criar novos posts e fazer upload de imagens do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

// Configura o armazenamento de arquivos usando Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define a pasta 'uploads/' como destino para os arquivos enviados
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads" , storage });
// Opção alternativa para usuários de Linux/Mac (sem configuração de armazenamento específica)
// const upload = multer({ dest: "./uploads"})

// Define uma função para configurar as rotas da aplicação
const routes = (app) => {
  // Habilita o parseamento de dados JSON no corpo das requisições
  app.use(express.json());

  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (chama a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (chama a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para lidar com upload de imagem (usa o middleware upload.single('imagem') e chama a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para ser usada no arquivo principal da aplicação
export default routes;