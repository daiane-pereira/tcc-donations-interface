import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cidade} from '../model/cidade';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  apiUrl = 'http://localhost:34621/cidades';

  constructor(
    private httpClient: HttpClient
  ) { }

  public consultar(codigoIbgeEstado: number): Observable<Cidade[]> {
    return this.httpClient.get<Cidade[]>(this.apiUrl + '/' + codigoIbgeEstado + '/estado');
  }
}
