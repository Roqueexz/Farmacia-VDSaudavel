export interface MedicamentoDTO {
    idMedicamento? : number,
    nome: string,
    fabricante: string,
    principioAtivo: string,
    dataValidade: number,
    preco: number,
    situacao?: boolean
}