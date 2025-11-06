import { DatabaseModel } from "./DatabaseModel.js";
import type { ClienteDTO } from "../interface/ClienteDTO.js";   

const database = new DatabaseModel().pool;

class Cliente {

    private idCliente: number = 0;
    private nome: string;
    private cpf: string;
    private telefone: string;
    private dataNascimento: number;
    private email: string;

    constructor(
        _nome: string,
        _cpf: string,
        _telefone: string,
        _dataNascimento: number,
        _email: string
    ) {
        this.nome = _nome;
        this.cpf = _cpf;
        this.telefone = _telefone;
        this.dataNascimento = _dataNascimento
        this.email = _email
    }

    public getIdCliente(): number {
        return this.idCliente;
    }

    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    public getDataNascimento(): number {
        return this.dataNascimento;
    }

    public setDataNascimento(dataNascimento: number): void {
        this.dataNascimento = dataNascimento;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

     static async cadastrarCliente(cliente: ClienteDTO): Promise<boolean> {
        try {
            const queryInsertCliente = `INSERT INTO clientes (nome, cpf, telefone, dataNascimento, email)
                                VALUES
                                ($1, $2, $3, $4, $5)
                                RETURNING id_cliente;`;

            const respostaBD = await database.query(queryInsertCliente, [
                cliente.nome.toUpperCase(),
                cliente.cpf,
                cliente.telefone,
                cliente.dataNascimento,
                cliente.email
            ]);
            if (respostaBD.rows.length > 0) {
                console.info(`Cliente cadastrado com sucesso. ID: ${respostaBD.rows[0].id_cliente}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

    static async listarClientes(): Promise<Array<Cliente> | null> {
        try {
            let listaDeClientes: Array<Cliente> = [];
            const querySelectClientes = `SELECT * FROM cliente;`;
            const respostaBD = await database.query(querySelectClientes);

            respostaBD.rows.forEach((clienteBD) => {
                const novoCliente: Cliente = new Cliente(
                    clienteBD.nome,
                    clienteBD.cpf,
                    clienteBD.telefone,
                    clienteBD.dataNascimento,
                    clienteBD.email,
                );

                novoCliente.setIdCliente(clienteBD.id_cliente);

                listaDeClientes.push(novoCliente);
            });

            return listaDeClientes;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);


            return null;
        }
    }
    static async listarCliente(cpf: number): Promise<Cliente | null> {
        try {
            const querySelectClientes = 'SELECT * FROM clientes WHERE cpf=$1;';

            const respostaBD = await database.query(querySelectClientes, [cpf]);

            if (respostaBD.rowCount != 0) {
                const cliente: Cliente = new Cliente(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].cpf,
                    respostaBD.rows[0].telefone,
                    respostaBD.rows[0].dataNascimento,
                    respostaBD.rows[0].email
                );
                cliente.setCpf(respostaBD.rows[0].cpf);

                return cliente;

            }
            return null;

        } catch (error) {
            console.error('Erro ao buscar cliente no banco de dados. ${error}');
            return null
        }
    }
}

export default Cliente;