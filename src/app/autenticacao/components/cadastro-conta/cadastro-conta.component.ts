import {Component, OnInit} from '@angular/core';
import {TipoComunicacao} from '../../../model/tipo-comunicacao';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ComunicacaoService} from '../../../service/comunicacao.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.scss']
})
export class CadastroContaComponent implements OnInit {

  public formConta: FormGroup;
  public tiposComunicacao: TipoComunicacao[];

  nome: string;
  apelido: string;
  email: string;
  telefone: number;
  tiposComunicacaoSelecionados: number[];
  senha: string;
  confirmacaoSenha: string;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private comunicacaoService: ComunicacaoService,
  ) { }

  ngOnInit(): void {
    this.inicializarCampos();
    this.consultarTiposComunicacao();
  }

  public inicializarCampos() {
    this.formConta = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(10)]],
      apelido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      comunicacao: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  public consultarTiposComunicacao() {
    this.comunicacaoService.consultar().subscribe(
      comunicacao => {
        this.tiposComunicacao = comunicacao;
      },
      erro => {
        const mensagem = 'Houve um erro ao buscar as comunicações disponíveis. Por favor, tente novamente em instantes.';
        this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      }
    );
  }

}
