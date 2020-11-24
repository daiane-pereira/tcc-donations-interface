import {Categoria} from './categoria';
import {Imagem} from './imagem';
import {Estado} from './estado';
import {Cidade} from './cidade';
import {Bairro} from './bairro';
import {Usuario} from './usuario';

export class DoacaoImagens {

  public id: number;
  public descricao: string;
  public detalhes: string;
  public status: string;
  public categoria: Categoria;
  public estado: Estado;
  public cidade: Cidade;
  public bairro: Bairro;
  public usuario: Usuario;
  public imagens: Imagem[];

  constructor(parametros: Partial<DoacaoImagens> = null) {
    Object.assign(this, parametros);
  }
}
