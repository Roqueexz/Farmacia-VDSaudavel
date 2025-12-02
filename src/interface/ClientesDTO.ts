export interface ClienteDTO {
  idCliente?: string, // ID do cliente (? indica que é opcional)
  nome: string, // Nome do cliente
  cpf: number, // Email do cliente
  telefone: string, // Telefone do cliente
  data_nascimento?: number; // Data de nascimento do cliente
  email?: string; // Email do cliente
}