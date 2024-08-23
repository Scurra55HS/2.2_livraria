import { Router } from "express";
import { getClientes, criarCliente, buscarCliente, deletarCliente } from "../controllers/clientesController.js"; //! Importar os "controllers"


const router = Router();

//? Definir as rotas

//~ Buscar todos os livros
router.get("/", Auth.private, getClientes);

router.post("/criar", criarCliente);
router.get("/:id", buscarCliente);
router.put("/editar/:id", editarCliente);
router.delete("/deletar/:id", deletarCliente);

export default router;