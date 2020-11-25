import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bairro } from '../model/bairro';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  apiUrl = 'https://tcc-donations-api.herokuapp.com/bairros';

  constructor(
    private httpClient: HttpClient
  ) { }

  public consultar(codigoIbgeCidade: number): Observable<Bairro[]> {
    return this.httpClient.get<Bairro[]>(this.apiUrl  + '/' + codigoIbgeCidade + '/cidade');
  }
}
