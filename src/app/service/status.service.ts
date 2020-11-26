import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatusDoacao} from '../model/statusDoacao';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private urlBase = 'https://tcc-donations-api.herokuapp.com/status';
  //private urlBase = 'http://localhost:34621/status';

  constructor(
    private httpClient: HttpClient
  ) { }

  public consultar(): Observable<StatusDoacao[]> {
    return this.httpClient.get<StatusDoacao[]>(this.urlBase);
  }
}
