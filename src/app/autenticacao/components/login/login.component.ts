import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.inicializarCampos();
  }

  public login() {

    this.auth.autenticar(this.formLogin.value).subscribe(
      () => {
        this.router.navigate(['/doacoes/consulta']);
      },
      erro => {
        const mensagem = 'Ops, houve um problema para realizar seu login. Verifique usuário/senha e tente novamente em instantes.';
        this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      }
    );
  }

  private inicializarCampos() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }
}
