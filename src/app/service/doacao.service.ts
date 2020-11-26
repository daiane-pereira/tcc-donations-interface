import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Doacao } from '../model/doacao';
import { DoacaoImagens } from '../model/doacao-imagens';

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {

  private urlBase = 'https://tcc-donations-api.herokuapp.com/doacoes';
  //private urlBase = 'http://localhost:34621/doacoes';
  private header = new HttpHeaders({ 'credencial': window.sessionStorage.getItem('credencial') });

  constructor(
    private httpClient: HttpClient
  ) { }

  public consultar(filtros: FormGroup): Observable<DoacaoImagens[]> {
    const url = this.criarUrlParaConsulta(filtros);
    return this.httpClient.get<DoacaoImagens[]>(url);
  }

  public consultarPorId(doacaoId: any): Observable<DoacaoImagens>{
    const url = this.urlBase + '/' + doacaoId;
    return this.httpClient.get<DoacaoImagens>(url);
  }

  public consultarPorStatus(descricaoStatus: string): Observable<any> {
    const url = this.urlBase + '/status/' + descricaoStatus;
    return this.httpClient.get<any>(url, { headers: this.header });
  }

  public incluir(doacao: Doacao): Observable<DoacaoImagens> {
    this.converterParametrosParaTexto(doacao);
    return this.httpClient.post<DoacaoImagens>(this.urlBase, doacao, { headers: this.header });
  }

  public alterar(doacaoId: number, doacao: Doacao): Observable<any> {
    const url = this.urlBase + '/' + doacaoId;
    return this.httpClient.put<Doacao>(url, doacao, { headers: this.header });
  }

  private criarUrlParaConsulta(filtros: FormGroup): string {
    let url = this.urlBase;

    if (filtros.value.bairro.toString()) {
      url += '/bairro/' + filtros.value.bairro.toString();
    } else if (filtros.value.cidade.toString()) {
      url += '/cidade/' + filtros.value.cidade.toString();
    } else if (filtros.value.estado.toString()) {
      url += '/estado/' + filtros.value.estado.toString();
    }

    if (filtros.value.categoria.toString()) {
      url += '/categoria/' + filtros.value.categoria.toString();
    }

    if (filtros.value.descricao) {
      url += '/descricao/' + filtros.value.descricao;
    }

    return url;
  }

  private converterParametrosParaTexto(doacao: Doacao): Doacao {
    doacao.bairro.toString();
    doacao.categoria.toString();
    return doacao;
  }
}
