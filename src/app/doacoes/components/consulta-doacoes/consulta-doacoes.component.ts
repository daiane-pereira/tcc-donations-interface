import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DoacaoImagens } from 'src/app/model/doacao-imagens';
import { Bairro } from '../../../model/bairro';
import { Categoria } from '../../../model/categoria';
import { Cidade } from '../../../model/cidade';
import { Estado } from '../../../model/estado';
import { BairroService } from '../../../service/bairro.service';
import { CategoriaService } from '../../../service/categoria.service';
import { CidadeService } from '../../../service/cidade.service';
import { DoacaoService } from '../../../service/doacao.service';
import { EstadoService } from '../../../service/estado.service';

@Component({
  selector: 'app-consulta-doacoes',
  templateUrl: './consulta-doacoes.component.html',
  styleUrls: ['./consulta-doacoes.component.scss']
})
export class ConsultaDoacoesComponent implements OnInit {

  public filtrosDoacao: FormGroup;
  public estados: Estado[] = [];
  public cidades: Cidade[] = [];
  public bairros: Bairro[] = [];
  public categorias: Categoria[] = [];
  public doacoes: DoacaoImagens[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private bairroService: BairroService,
    private categoriaService: CategoriaService,
    private doacaoService: DoacaoService,
    public sanitizer: DomSanitizer
  ) { }

  public ngOnInit(): void {
    this.inicializarFiltros();
    this.consultarEstados();
    this.consultarCategorias();
    this.consultarDoacoes();
  }

  private inicializarFiltros() {
    this.filtrosDoacao = this.fb.group({
      estado: [''],
      cidade: [''],
      bairro: [''],
      categoria: [''],
      descricao: ['']
    });
  }

  public consultarEstados() {
    this.estadoService.consultar().subscribe(estados => {
      this.estados = estados;
    });
  }

  public consultarCidades() {
    this.limparBairros();
    this.cidadeService.consultar(this.filtrosDoacao.value.estado).subscribe(cidades => {
      this.cidades = cidades;
    });
  }

  public consultarBairros() {
    this.bairroService.consultar(this.filtrosDoacao.value.cidade).subscribe(bairros => {
      this.bairros = bairros;
    });
  }

  public consultarCategorias() {
    this.categoriaService.consultar().subscribe(dados => {
      this.categorias = dados;
    });
  }

  public consultarDoacoes() {
    this.doacaoService.consultar(this.filtrosDoacao).subscribe(
      doacoes => {
        if (doacoes == null) {
          this.doacoes = [];
          return;
        }

        doacoes.forEach(doacao => {
          doacao.imagens.forEach(imagem => {
            imagem.safeUpload = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + imagem.upload);
          });
        });
        this.doacoes = doacoes;
      });
  }

  public abrirDetalhes(doacaoSelecionada: DoacaoImagens) {
    const urlComponenteDetalhes = '/doacoes/detalhes/' + doacaoSelecionada.id;
    this.router.navigateByUrl(urlComponenteDetalhes, { state: { doacao: doacaoSelecionada } });
  }

  private limparBairros() {
    this.bairros = [];
    this.filtrosDoacao.value.bairro = '';
  }
}
