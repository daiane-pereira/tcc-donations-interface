import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Login} from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static usuarioAutenticado: Login;

  private urlBase = 'https://tcc-donations-api.herokuapp.com/login';
  //private urlBase = 'http://localhost:34621/login';

  public constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  private enviarCredenciais(credencial: Login): Observable<any> {
    const url = this.urlBase + '/usuario';
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, credencial, { headers: header });
  }

  public autenticar(credencial: Login): Observable<any> {
    return this.enviarCredenciais(credencial).pipe(
      tap(() => {
        this.setUsuario(credencial);
      }),
    );
  }

  public setUsuario(credencial: Login): void {
    AuthService.usuarioAutenticado = credencial;

    sessionStorage.setItem('credencial',
      btoa(
        AuthService.usuarioAutenticado.email + ':' + AuthService.usuarioAutenticado.senha,
      ),
    );
  }

  public getUsuario(): Login {
    if (sessionStorage.getItem('credencial')) {
      const stringStorage = atob(sessionStorage.getItem('credencial'));
      const lista = stringStorage.split(':');
      const credencial = { email: lista[0], senha: lista[1] } as Login;
      AuthService.usuarioAutenticado = credencial;
    }

    return AuthService.usuarioAutenticado || null;
  }

  public encerrarSessao() {
    AuthService.usuarioAutenticado = null;
    sessionStorage.clear();
    this.router.navigate(['/autenticacao/login']);
  }
}
