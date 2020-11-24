import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-doacoes',
  templateUrl: './doacoes.component.html',
  styleUrls: ['./doacoes.component.scss']
})
export class DoacoesComponent implements OnInit {

  public constructor(
    private auth: AuthService
  ) { }

  public ngOnInit(): void { }

  public usuarioAutenticado(): boolean {
    return !!this.auth.getUsuario();
  }

  public sair() {
    return this.auth.encerrarSessao();
  }
}
