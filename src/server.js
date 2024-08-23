import "dontev/config";
import express from "express";

//& Conexão com banco de dados
import conn from "./config/conn.js";

//& Importação dos modulos e criação das tabelas
import "./models/livroModel.js";
import "./models/clienteModel.js";
import "./models/funcionarioModel.js";

//& Importação das ROTAS
import "./routes/livroRoutes.js"
import "./routes/clienteRoutes.js"
import "./routes/funcionarioRoutes.js"

const PORT = process.env.PORT;

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Utilização das rotas
//http://localhost:3333/livros
app.use("/livros", livroRoutes);
