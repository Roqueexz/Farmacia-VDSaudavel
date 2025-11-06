import type { ClienteDTO } from "../interface/ClientesDTO.js";
import Cliente from "../model/Clientes.js";
import type { Request, Response } from "express";

class ClienteController extends Cliente {

   
    static async cliente(req: Request, res: Response): Promise<Response> {
        try {
            const cpf: number = parseInt(req.params.cpf as string);

            if (isNaN(cpf) || cpf <= 0) {
                return res.status(400).json({ mensagem: "ID inválido." });
            }

            const respostaModelo = await Cliente.listarCliente(cpf);

            if (respostaModelo === null) {
                return res.status(200).json({ mensagem: "Nenhum cliente encontrado com o CPF fornecido." });
            }

            return res.status(200).json(respostaModelo);
        } catch (error) {
            console.error(`Erro ao acesso o modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível recuperar o cliente." });
        }
    }        
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listarClientes: Array<Cliente> | null = await Cliente.listarClientes();

            return res.status(200).json(listarClientes);
        } catch (error) {
            console.error(`Erro ao consultar modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de clientes." });
        }
    }
        static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidosCliente = req.body;

            const respostaModelo = await Cliente.cadastrarCliente(dadosRecebidosCliente);

            if (respostaModelo) {
                return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar cliente." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);

            return res.status(500).json({ mensagem: "Não foi possível inserir o cliente" });
        }
    }
}

export default ClienteController;