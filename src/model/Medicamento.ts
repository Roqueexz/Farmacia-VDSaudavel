import type { MedicamentoDTO } from "../interface/MedicamentoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Medicamento {
    private idMedicamento: number = 0;
    private nome: string;
    private fabricante: string;
    private principioAtivo: string;
    private dataValidade: number;
    private preco: number;

    constructor(
        _nome: string,
        _fabricante: string,
        _principioAtivo: string,
        _dataValidade: number,
        _preco: number
    ) {
        this.nome = _nome;
        this.fabricante = _fabricante;
        this.principioAtivo = _principioAtivo;
        this.dataValidade = _dataValidade;
        this.preco = _preco
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

    public getFabricante(): string {
        return this.fabricante;
    }


    public setFabricante(fabricante: string): void {
        this.fabricante = fabricante;
    }


    public getPrincipioAtivo(): string {
        return this.principioAtivo;
    }

    public setPrincipioAtivo(principioAtivo: string): void {
        this.principioAtivo = principioAtivo;
    }

    public getDataValidade(): number {
        return this.dataValidade;
    }

    public setDataValidade(dataValidade: number): void {
        this.dataValidade = dataValidade;
    }

        public getPreco(): number {
        return this.preco;
    }

    public setPreco(preco: number): void {
        this.preco = preco;
    }

         static async cadastrarMedicamento(medicamento: MedicamentoDTO): Promise<boolean> {
            try {
                const queryInsertMedicamento = `INSERT INTO medicamentos (nome, fabricante, principio_ativo, data_validadade, preco)
                                    VALUES
                                    ($1, $2, $3, $4, $5)
                                    RETURNING id_cliente;`;
    
                const respostaBD = await database.query(queryInsertMedicamento, [
                    medicamento.nome.toUpperCase(),
                    medicamento.fabricante,
                    medicamento.principioAtivo,
                    medicamento.dataValidade,
                    medicamento.preco
                ]);
                if (respostaBD.rows.length > 0) {
                    console.info(`Medicamento cadastrado com sucesso. ID: ${respostaBD.rows[0].id_medicamento
                    }`);
                    return true;
                }
                return false;
            } catch (error) {
                console.error(`Erro na consulta ao banco de dados. ${error}`);
                return false;
            }
        }

    static async listarMedicamento(): Promise<Array<Medicamento> | null> {
        try {
            let listaDeMedicamento: Array<Medicamento> = [];

            const querySelectMedicamento = `SELECT * FROM Medicamentos;`;

            const respostaBD = await database.query(querySelectMedicamento);

            respostaBD.rows.forEach((linha: any) => {
                const novoMedicamento: Medicamento = new Medicamento(
                    linha.nome,
                    linha.fabricante,
                    linha.principioAtivo,
                    linha.dataValidade,
                    linha.preco
                );

                novoMedicamento.setIdMedicamento(linha.id_medicamento);

                listaDeMedicamento.push(novoMedicamento);
            });

            return listaDeMedicamento;
        } catch (error) {
            console.error(`Erro ao acessar o banco de dados. ${error}`);
            return null;
        }
    }

        static async listarMedicamentoNome(nome: string): Promise<Medicamento | null> {
        try {
            const querySelectMedicamento = 'SELECT * FROM medicamentos WHERE nome=$1;';

            const respostaBD = await database.query(querySelectMedicamento, [nome]);

            if (respostaBD.rowCount != 0) {
                const medicamento: Medicamento = new Medicamento(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].fabricante,
                    respostaBD.rows[0].principioAtivo,
                    respostaBD.rows[0].dataValidade,
                    respostaBD.rows[0].preco
                );
                medicamento.setNome(respostaBD.rows[0].nome);

                return medicamento;

            }
            return null;

        } catch (error) {
            console.error('Erro ao buscar medicamento no banco de dados. ${error}');
            return null
        }
    }

            static async listarMedicamentoPrincipio(principioAtivo: string): Promise<Medicamento | null> {
        try {
            const querySelectMedicamento = 'SELECT * FROM medicamentos WHERE principio_ativo=$3;';

            const respostaBD = await database.query(querySelectMedicamento, [principioAtivo]);

            if (respostaBD.rowCount != 0) {
                const medicamento: Medicamento = new Medicamento(
                    respostaBD.rows[0].nome,
                    respostaBD.rows[0].fabricante,
                    respostaBD.rows[0].principioAtivo,
                    respostaBD.rows[0].dataValidade,
                    respostaBD.rows[0].preco
                );
                medicamento.setPrincipioAtivo(respostaBD.rows[0].principioAtivo);

                return medicamento;

            }
            return null;

        } catch (error) {
            console.error('Erro ao buscar medicamento no banco de dados. ${error}');
            return null
        }
    }
}

export default Medicamento;