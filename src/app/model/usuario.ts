import {TipoComunicacao} from './tipo-comunicacao';

export class Usuario {

  public id: number;
  public nome: string;
  public tiposComunicacao: TipoComunicacao[];
  public email: string;
  public telefone: number;
}
