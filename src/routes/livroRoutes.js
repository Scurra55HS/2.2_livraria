import { Router } from "express";
import { getLivros, criarLivros, buscarLivro, deletarLivro } from "../controllers/livrosController"; //! Importar os "controllers"

const router = Router();

//? Definir as rotas

//~ Buscar todos os livros
router.get("/", getLivros);
//~ Cadastrar livro
router.post("/criar", criarLivros);
//~ Listar 1
router.get("/:id", buscarLivro);
//~ Atualizar
router.put("/editar/:id", atualizarLivro);
//~ Deletar
router.delete("/deletar/:id", deletarLivro);

export default router;