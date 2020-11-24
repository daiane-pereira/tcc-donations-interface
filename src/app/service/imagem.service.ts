import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Imagem} from '../model/imagem';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  private urlBase = 'http://localhost:34621/imagens';

  constructor(
    private httpClient: HttpClient
  ) { }

  public upload(doacaoId: number, imagem: File): Observable<Imagem> {
    const url = this.urlBase + '/' + doacaoId + '/doacao';
    const formData = new FormData();
    formData.append('imagem', imagem);
    return this.httpClient.post<Imagem>(url, formData);
  }

  public excluir(doacaoId: number): Observable<any> {
    const url = this.urlBase + '/' + doacaoId + '/doacao';
    return this.httpClient.delete(url);
  }
}
