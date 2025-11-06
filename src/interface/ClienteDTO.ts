export interface ClienteDTO {
    idCliente? : number,
    nome: string,
    cpf: number,
    telefone: number,
    dataNascimento: number,
    email: string,
    situacao?: boolean
}