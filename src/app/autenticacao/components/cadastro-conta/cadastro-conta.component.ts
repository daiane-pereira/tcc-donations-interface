import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ComunicacaoService} from '../../../service/comunicacao.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UsuarioService} from '../../../service/usuario.service';
import {Usuario} from '../../../model/usuario';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.scss']
})
export class CadastroContaComponent implements OnInit {

  public formConta: FormGroup;
  public usuarioCadastrado: Usuario;
  public comunicacao = ['E-mail', 'Ligação', 'WhatsApp', 'SMS'];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private readonly router: Router,
    private comunicacaoService: ComunicacaoService,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.inicializarCampos();
  }

  public inicializarCampos() {
    this.formConta = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(10)]],
      apelido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      comunicacao: this.buildTipoComunicacao(),
      senha: ['', [Validators.required]]
    });
  }

  public buildTipoComunicacao() {
    const tiposComunicacao = this.comunicacao.map(c => new FormControl(false));
    return this.fb.array(tiposComunicacao);
  }

  public incluirUsuario() {
    let conta = Object.assign({}, this.formConta.value);
    conta = Object.assign(conta, {
      comunicacao: conta.comunicacao
        .map((v, i) => v ? this.comunicacao[i] : null)
        .filter(v => v !== null)
    });



    this.usuarioService.incluir(conta).subscribe(
      usuario => {
        this.usuarioCadastrado = usuario;
        const mensagem = 'Sua conta foi cadastrada.';
        this.snackBar.open(mensagem, 'Sucesso', { duration: 2000 });
        this.router.navigate(['/autenticacao/login']);
      },
      erro => {
        const mensagem = 'Houve um erro ao cadastrar sua conta.';
        this.snackBar.open(mensagem, 'Erro', { duration: 2000 });
      }
    );
  }
}
