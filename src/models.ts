export interface CadastroDto {
  nome: string;
  email: string;
  senha: string;
}

export interface CadastroLojaDto {
  nome: string;
  dominio: string;
  servidor: string;
  plano: "gratis" | "premium";
  integracao: "minecraft" | "mta";
}

export interface LoginDto {
  email: string;
  password: string;
}

declare module "express-session" {
  interface SessionData {
    idDb: number;
    username: string;
    admLevel: number;
  }
}

export enum AdmLevel {
  gratis,
  premium,
  subuser,
  admin,
}

export interface TicketDto {
  assunto: string;
  mensagem: string;
}

export enum StatusTicket {
  aberto,
  fechado,
  atendendo,
}
