import { Router } from "express"; 
import type { Request, Response } from "express"; 
import MedicamentosController from "./controller/MedicamentoController.js";
import ClienteController from "./controller/ClienteController.js";
const router = Router(); 

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

router.get("/api/medicamentos", MedicamentosController.todos);

router.post("/api/medicamentos", MedicamentosController.novo);

router.get("/api/clientes", ClienteController.todos);

router.post("/api/clientes", ClienteController.novo);

router.get("/api/clientes/:cpf", ClienteController.cliente);
export { router }; 