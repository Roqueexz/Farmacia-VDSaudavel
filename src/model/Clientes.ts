import type { ClienteDTO } from "../interface/ClientesDTO.js";
import { DatabaseModel } from "./DatabaseModel.js"; 

const database = new DatabaseModel().pool; 

class Cliente {
  private idCliente: number = 0;
  private nome: string;
  private cpf: number;
  private data_nascimento: number;
  private email: string;
  private telefone: number;

  constructor(_nome: string, _cpf: number, _telefone: number, _data_nascimento: number, _email: string) {
    this.nome = _nome;
    this.cpf = _cpf;
    this.telefone = _telefone;
    this.data_nascimento = _data_nascimento;
    this.email = _email;
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

 
  public getCpf(): number {
    return this.cpf;
  }

  
  public setCpf(cpf: number): void {
    this.cpf = cpf;
  }

 
  public getTelefone(): number {
    return this.telefone;
  }

 
  public setTelefone(telefone: number): void {
    this.telefone = telefone;
  }

  public getDataNascimento(): number {
    return this.data_nascimento;
  }
    public setDataNascimento(data_nascimento: number): void {
    this.data_nascimento = data_nascimento;
  }
    public getEmail(): string {
    return this.email;
  }
    public setEmail(email: string): void {
    this.email = email;
  }


  static async listarClientes(): Promise<Array<Cliente> | null> {
    try {
      let listaDeClientes: Array<Cliente> = [];

      const querySelectClientes = `SELECT * FROM clientes;`;

      const respostaBD = await database.query(querySelectClientes);

      respostaBD.rows.forEach((clienteBD) => {
        const novoCliente: Cliente = new Cliente(
          clienteBD.nome,
          clienteBD.cpf,
          clienteBD.telefone,
          clienteBD.data_nascimento,
          clienteBD.email
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
            const querySelectCliente = `SELECT * FROM clientes WHERE cpf=$1;`;

            const respostaBD = await database.query(querySelectCliente, [cpf]);

            if(respostaBD.rowCount != 0) {
                const cliente: Cliente = new Cliente(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].cpf,
                    respostaBD.rows[0].telefone,
                    respostaBD.rows[0].data_nascimento,
                    respostaBD.rows[0].email
                );

                cliente.setCpf(respostaBD.rows[0].cpf);

                return cliente;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar cliente no banco de dados. ${error}`);

            return null;
        }
    }

  static async cadastrarCliente(cliente: Cliente): Promise<Boolean> {
    try {
      const queryInsertCliente = `INSERT INTO clientes (nome, cpf, telefone, data_nascimento, email) 
                                    VALUES 
                                    ($1, $2, $3, $4, $5)
                                    RETURNING id_cliente;`;
      const respostaBD = await database.query(queryInsertCliente, [
        cliente.nome.toUpperCase(),
        cliente.cpf,
        cliente.telefone,
        cliente.data_nascimento,
        cliente.email
      ]);

      if (respostaBD.rows.length > 0) {
        console.info(
          `Cliente cadastrado com sucesso! ID: ${respostaBD.rows[0].id_cliente}`
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return false;
    }
  }
}
export default Cliente;