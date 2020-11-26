import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TipoComunicacao} from '../model/tipo-comunicacao';

@Injectable({
  providedIn: 'root'
})
export class ComunicacaoService {

  private urlBase = 'https://tcc-donations-api.herokuapp.com/tipos-comunicacao';
  //private urlBase = 'http://localhost:34621/tipos-comunicacao';

  constructor(
    private httpClient: HttpClient
  ) { }

  public consultar(): Observable<TipoComunicacao[]>{
    return this.httpClient.get<TipoComunicacao[]>(this.urlBase);
  }
}
