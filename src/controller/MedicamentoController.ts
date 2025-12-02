import type { MedicamentoDTO } from "../interface/MedicamentosDTO.js";
import Medicamentos from "../model/Medicamentos.js";
import type { Request, Response } from "express";

class MedicamentosController extends Medicamentos {

 
    static async medicamento(req: Request, res: Response): Promise<Response> {
        try {
            const nome: string = req.params.nome as string;

            console.log(nome)

            if (!nome || nome.trim() === '') {
                return res.status(400).json({ mensagem: "Nome inválido." });
            }

            const respostaModelo = await Medicamentos.listarMedicamentoPorNome(nome);

            if (respostaModelo === null) {
                return res.status(404).json({ mensagem: "Nenhum medicamento encontrado com o nome fornecido." });
            }

            return res.status(200).json(respostaModelo);
        } catch (error) {
            console.error(`Erro ao acessar o modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível recuperar o medicamento." });
        }
    }

    static async principioativo(req: Request, res: Response): Promise<Response> {
        try {
            const principio_ativo: string = req.params.principio_ativo as string;

            console.log(principio_ativo)

            if (!principio_ativo || principio_ativo.trim() === '') {
                return res.status(400).json({ mensagem: "Principio ativo inválido." });
            }

            const respostaModelo = await Medicamentos.listarMedicamentoPorPrincipioAtivo(principio_ativo);

            if (respostaModelo === null) {
                return res.status(404).json({ mensagem: "Nenhum medicamento encontrado com o principio ativo fornecido." });
            }

            return res.status(200).json(respostaModelo);
        } catch (error) {
            console.error(`Erro ao acessar o modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível recuperar o medicamento." });
        }
    }

 
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const nome = req.query.nome as string;
            
            if (nome) {
                const medicamento = await Medicamentos.listarMedicamentoPorNome(nome);
                
                if (!medicamento) {
                    return res.status(404).json({ mensagem: "Medicamento não encontrado." });
                }
                
                return res.status(200).json(medicamento);
            }

            const listarMedicamento = await Medicamentos.listarMedicamento();
            
            if (!listarMedicamento) {
                return res.status(500).json({ mensagem: "Erro ao consultar medicamentos." });
            }

            return res.status(200).json(listarMedicamento);
        } catch (error) {
            console.error(`Erro ao consultar medicamento. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de medicamentos." });
        }
    }
        static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosMedicamentos = req.body;

            const respostaMedicamento = await Medicamentos.cadastrarMedicamento(dadosRecebidosMedicamentos);

            if (respostaMedicamento) {
                return res.status(201).json({ mensagem: "Medicamento cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar medicamento." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o medicamento" });
        }
    }
}



export default  MedicamentosController;