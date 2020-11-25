import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  apiUrl = 'https://tcc-donations-api.herokuapp.com/categorias';

  constructor(
    private httpClient: HttpClient
  ) { }

  public consultar(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.apiUrl);
  }
}
