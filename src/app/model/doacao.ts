import { Categoria } from './categoria';
import { Estado } from './estado';
import { Cidade } from './cidade';
import { Bairro } from './bairro';
import { Usuario } from './usuario';

export class Doacao {

  public id: number;
  public descricao: string;
  public detalhes: string;
  public status: string;
  public categoria: Categoria;
  public estado: Estado;
  public cidade: Cidade;
  public bairro: Bairro;
  public usuario: Usuario;
}
