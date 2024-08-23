import { Router } from "express";
import { getFuncionarios, criarFuncionario, buscarFuncionario, editarFuncionario, deletarFuncionario } from "../controllers/clientesController.js"; //! Importar os "controllers"

const router = Router();

router.get("/", getFuncionarios);
router.post("/criar", criarFuncionario);
router.get("/:id", buscarFuncionario);
router.put("/editar/:id", editarFuncionario);
router.delete("/deletar/:id", deletarFuncionario);

export default router;