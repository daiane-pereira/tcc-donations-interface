import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Conta} from '../model/conta';
import {Observable} from 'rxjs';
import {Usuario} from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = 'https://tcc-donations-api.herokuapp.com/usuarios';
  //private urlBase = 'http://localhost:34621/usuarios';

  private header = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private httpClient: HttpClient
  ) { }

  public incluir(conta: any): Observable<Usuario> {
    console.log(conta);
    this.converterParametrosParaTexto(conta);
    // return this.httpClient.post<Usuario>(this.urlBase,  conta, { headers: this.header});
    return this.httpClient.post<Usuario>(this.urlBase, conta);
  }

  private converterParametrosParaTexto(parametros: Conta): any {
    return parametros.telefone.toString();
  }
}
