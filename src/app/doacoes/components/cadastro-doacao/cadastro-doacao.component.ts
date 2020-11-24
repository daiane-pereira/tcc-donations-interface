import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Bairro } from '../../../model/bairro';
import { Categoria } from '../../../model/categoria';
import { Cidade } from '../../../model/cidade';
import { Doacao } from '../../../model/doacao';
import { DoacaoImagens } from '../../../model/doacao-imagens';
import { Estado } from '../../../model/estado';
import { StatusDoacao } from '../../../model/statusDoacao';
import { BairroService } from '../../../service/bairro.service';
import { CategoriaService } from '../../../service/categoria.service';
import { CidadeService } from '../../../service/cidade.service';
import { DoacaoService } from '../../../service/doacao.service';
import { EstadoService } from '../../../service/estado.service';
import { ImagemService } from '../../../service/imagem.service';
import { StatusService } from '../../../service/status.service';
import {Usuario} from '../../../model/usuario';

@Component({
  selector: 'app-cadastro-doacao',
  templateUrl: './cadastro-doacao.component.html',
  styleUrls: ['./cadastro-doacao.component.scss']
})
export class CadastroDoacaoComponent implements OnInit {

  public categorias: Categoria[];
  public estados: Estado[];
  public cidades: Cidade[];
  public bairros: Bairro[];
  public doacao: DoacaoImagens = null;
  public statusDoacao: StatusDoacao[];
  public formInfosDoacao: FormGroup;
  public formImagensDoacao: FormGroup;
  public imagensCarregadas: FileList = null;
  public edicao = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private statusService: StatusService,
    private categoriaService: CategoriaService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private bairroService: BairroService,
    private doacaoService: DoacaoService,
    private imagemService: ImagemService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.doacao = nav.extras?.state?.doacao;
  }

  ngOnInit(): void {
    this.inicializarCampos();
    this.consultarCategorias();
    this.consultarEstados();
  }

  private inicializarCampos() {

    if (this.doacao != null) {
      this.formInfosDoacao = this.fb.group({
        id: [this.doacao.id, [Validators.required]],
        descricao: [this.doacao.descricao, [Validators.required]],
        detalhes: [this.doacao.detalhes, [Validators.required]],
        status: [this.doacao.status, [Validators.required]],
        categoria: [this.doacao.categoria.id, [Validators.required]],
        estado: [this.doacao.estado.codigoIbge, [Validators.required]],
        cidade: [this.doacao.cidade.codigoIbge, [Validators.required]],
        bairro: [this.doacao.bairro.id, [Validators.required]],
      });

      this.formImagensDoacao = this.fb.group({
        imagens: [null, [Validators.required]]
      });

      this.edicao = true;
      this.consultarStatus();
      this.consultarCidades();
      this.consultarBairros();
      return;
    }

    this.formInfosDoacao = this.fb.group({
      descricao: ['', [Validators.required]],
      detalhes: ['', [Validators.required]],
      status: ['Ativa', [Validators.required]],
      categoria: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
    });

    this.formImagensDoacao = this.fb.group({
      imagens: [null, [Validators.required]]
    });
  }

  public consultarStatus() {
    this.statusService.consultar().subscribe(
      status => {
        this.statusDoacao = status;
      },
      erro => {
        const mensagem = 'Houve um erro ao buscar os status disponíveis. Por favor, tente novamente em instantes.';
        this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      }
    );
  }

  public consultarCategorias() {
    this.categoriaService.consultar().subscribe(dados => {
      this.categorias = dados;
    });
  }

  public consultarEstados() {
    this.estadoService.consultar().subscribe(estados => {
      this.estados = estados;
    });
  }

  public consultarCidades() {
    this.limparBairros();
    this.cidadeService.consultar(this.formInfosDoacao.value.estado).subscribe(cidades => {
      this.cidades = cidades;
    });
  }

  public consultarBairros() {
    this.bairroService.consultar(this.formInfosDoacao.value.cidade).subscribe(bairros => {
      this.bairros = bairros;
    });
  }

  public selecionarImagens(imagens: any) {
    this.imagensCarregadas = imagens.target.files;
  }

  public salvar() {
    if (this.edicao === true) {
      this.alterar();
      return;
    }
    this.incluir();
  }

  public incluir() {
    console.log('this.existeDadosInvalidos', this.existeDadosInvalidos());

    if (this.existeDadosInvalidos()) {
      return;
    }

    this.doacaoService.incluir(this.formInfosDoacao.value)
      .subscribe(
        (doacao: Doacao) => {

          for (const imagem of Array.from(this.imagensCarregadas)) {
            this.uploadImagem(doacao.id, imagem);
          }
          const mensagem = 'Sua doação foi cadastrada.';
          this.snackBar.open(mensagem, 'Sucesso', { duration: 5000 });
        },
        erro => {
          const mensagem = 'Tivemos um problema para cadastrar a sua doação. Por favor, tente novamente em instantes.';
          this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
        }
      );
    return false;
  }

  public alterar() {
    this.doacaoService.alterar(this.formInfosDoacao.value.id, this.formInfosDoacao.value).subscribe(
      doacao => {
        if (this.imagensCarregadas != null) {
          this.excluirImagens(doacao.id);

          for (let index = 0; index < this.imagensCarregadas.length; index++) {
            this.uploadImagem(doacao.id, this.imagensCarregadas[index]);
          }
        }

        const mensagem = 'A doação foi salva.';
        this.snackBar.open(mensagem, 'Sucesso', { duration: 5000 });
      },
      erro => {
        const mensagem = 'Tivemos um problema para cadastrar a sua doação. Por favor, tente novamente em instantes.';
        this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      }
    );
    return false;
  }

  public uploadImagem(doacaoId: number, imagem: File) {
    this.imagemService.upload(doacaoId, imagem).subscribe(
      null,
      error => {
        const mensagem = 'Ops, houve um problema para salvar a seguinte imagem: ' + imagem.name + '.';
        this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      }
    );
  }

  public excluirImagens(doacaoId: number) {
    this.imagemService.excluir(doacaoId).subscribe(
      null,
      erro => {
        const mensagem = 'Ops, houve um problema para excluir suas imagens.';
        this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      }
    );
  }

  private existeDadosInvalidos(): boolean {
    if (this.formImagensDoacao.invalid) {
      const mensagem = 'Ops, houve um problema. Por favor, verifique a seção fotos.';
      this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      return true;
    }

    return false;
  }

  private limparBairros() {
    this.bairros = [];
    this.formInfosDoacao.value.bairro = '';
  }
}
