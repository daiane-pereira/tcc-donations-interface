import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public constructor(
    private readonly service: AuthService,
    private readonly router: Router,
  ) { }

  public canActivate(): boolean {

    const autenticado: boolean = !!this.service.getUsuario();

    if (autenticado) {
      return true;
    }

    this.router.navigate(['/autenticacao/login']);
    return false;
  }
}
