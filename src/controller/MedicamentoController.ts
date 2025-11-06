import Medicamento from "../model/Medicamento.js";
import type { Request, Response } from "express";

class MedicamentoController extends Medicamento {

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaMedicamentos: Array<Medicamento> | null = await Medicamento.listarMedicamento();
            return res.status(200).json(listaMedicamentos);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de medicamentos." });
        }

    }

        static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosMedicamento = req.body;
            const respostaModelo = await Medicamento.cadastrarMedicamento(dadosRecebidosMedicamento);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Meidcamento cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar medicamento ." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o medicamento." });
        }
    }
    static async medicamentoNome(req: Request, res: Response): Promise<Response> {
        try {
            const nome: string = (req.params.nome as string);
           if(nome == null) {
            return res.status(400).json({ mensagem: "Nome não informado." });
            }
            const respostaModelo = await Medicamento.listarMedicamentoNome(nome);
            if (respostaModelo == null) {
                return res.status(200).json({ mensagem: "Nenhum medicamento encontrado com o nome fornecido." });
            }
            return res.status(200).json(respostaModelo);
        } catch (error) {

            console.error(`Erro ao acesso o modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível recuperar o medicamento." });
        }
    }

        static async medicamentoPrincipio(req: Request, res: Response): Promise<Response> {
        try {
            const principioAtivo: string = (req.params.principioAtivo as string);
           if(principioAtivo == null) {
            return res.status(400).json({ mensagem: "Princípio ativo não informado." });
            }
            const respostaModelo = await Medicamento.listarMedicamentoPrincipio(principioAtivo);
            if (respostaModelo == null) {
                return res.status(200).json({ mensagem: "Nenhum medicamento encontrado com o princípio ativoSS fornecido." });
            }
            return res.status(200).json(respostaModelo);
        } catch (error) {

            console.error(`Erro ao acesso o modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível recuperar o medicamento." });
        }
    }
}

export default MedicamentoController;