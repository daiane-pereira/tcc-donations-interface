import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../model/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  apiUrl = 'https://tcc-donations-api.herokuapp.com/estados';

  constructor(
    private httpClient: HttpClient
  ) { }

  public consultar(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(this.apiUrl);
  }
}
