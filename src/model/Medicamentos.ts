import type { MedicamentosDTO } from "../interface/MedicamentosDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool; 

class Medicamentos {
  private idMedicamento: number = 0;
  private nome: string;
  private fabricante: string;
  private principio_ativo: string;
  private data_validade: number;
  private preco: number;


  constructor(_nome: string, _fabricante: string, _principio_ativo: string, _data_validade: number, _preco: number) {
    this.nome = _nome;
    this.fabricante = _fabricante;
    this.principio_ativo = _principio_ativo;
    this.data_validade = _data_validade;
    this.preco = _preco;
  }

  
  public getIdMedicamento(): number {
    return this.idMedicamento;
  }

  
  public setIdMedicamento(idMedicamento: number): void {
    this.idMedicamento = idMedicamento;
  }

 
  public getNome(): string {
    return this.nome;
  }

 
  public setNome(nome: string): void {
    this.nome = nome;
  }

 
  public getFabricantes(): string {
    return this.fabricante;
  }


  public setFabricante(fabricante: string): void {
    this.fabricante = fabricante;
  }

 
  public getprincipioAtivo(): string {
    return this.principio_ativo;
  }

  
  public setprincipioAtivo(principio_ativo: string): void {
    this.principio_ativo = principio_ativo;
  }

  public getDataValidade(): number {
    return this.data_validade;
  }

  public setDataValidade(data_validade: number): void {
    this.data_validade = data_validade;
  }
  public getPreco(): number {
    return this.preco;
  }
  public setPreco(preco: number): void {
    this.preco = preco;
  }

  
  static async listarMedicamento(): Promise<Array<Medicamentos> | null> {
    try {
      let listaDeMedicamentos: Array<Medicamentos> = [];

      const querySelectMedicamento = `SELECT * FROM medicamentos;`;

      const respostaBD = await database.query(querySelectMedicamento);


      respostaBD.rows.forEach((MedicamentosBD) => {
        const novoMedicamento: Medicamentos = new Medicamentos(
          MedicamentosBD.nome,
          MedicamentosBD.fabricante,
          MedicamentosBD.principio_ativo,
          MedicamentosBD.data_validade,
          MedicamentosBD.preco
        );

        novoMedicamento.setIdMedicamento(MedicamentosBD.id_Medicamento);

        listaDeMedicamentos.push(novoMedicamento);
      });

      return listaDeMedicamentos;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);

      return null;
    }
  }
static async cadastrarMedicamento(Medicamentos: MedicamentosDTO): Promise<boolean> {
    try {
      const queryInsertMedicamentos = `
                INSERT INTO Medicamentos (nome, fabricante, principio_ativo, data_validade, preco) 
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id_Medicamento;
            `;

      const respostaBD = await database.query(queryInsertMedicamentos, [
        Medicamentos.nome.toUpperCase(),
        Medicamentos.fabricante,
        Medicamentos.principio_ativo,
        Medicamentos.data_validade,
        Medicamentos.preco,
      ]);

      if (respostaBD.rows.length > 0) {
        console.info(
          `Medicamento cadastrado com sucesso. ID: ${respostaBD.rows[0].id_Medicamento}`
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

export default Medicamentos;