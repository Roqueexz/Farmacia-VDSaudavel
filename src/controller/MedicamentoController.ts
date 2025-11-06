import type { MedicamentosDTO } from "../interface/MedicamentosDTO.js";
import Medicamentos from "../model/Medicamentos.js";
import type { Request, Response } from "express";

class  MedicamentosController extends Medicamentos {

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listarMedicamento: Array<Medicamentos> | null = await Medicamentos.listarMedicamento();

            return res.status(200).json(listarMedicamento);
        } catch (error) {
            console.error(`Erro ao consultar medicamento. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de medicamentos." });
        }
    }
        static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosMedicamentos = req.body;

            const respostaMedicamento = await Medicamentos.cadastrarMedicamento(dadosRecebidosMedicamentos);

            if (respostaMedicamento) {
                return res.status(201).json({ mensagem: "Medicamento foi cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar o medicamento." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o medicamento" });
        }
    }
}



export default  MedicamentosController;