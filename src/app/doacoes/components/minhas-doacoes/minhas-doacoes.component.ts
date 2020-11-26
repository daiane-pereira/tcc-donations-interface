import {Component, OnInit} from '@angular/core';
import {DoacaoImagens} from '../../../model/doacao-imagens';
import {DoacaoService} from '../../../service/doacao.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Location} from '@angular/common';
import { Doacao } from 'src/app/model/doacao';

@Component({
  selector: 'app-minhas-doacoes',
  templateUrl: './minhas-doacoes.component.html',
  styleUrls: ['./minhas-doacoes.component.scss']
})
export class MinhasDoacoesComponent implements OnInit {

  public doacoesAtivas: DoacaoImagens[] = [];
  public doacoesReservadas: DoacaoImagens[] = [];
  public doacoesInativas: DoacaoImagens[] = [];
  public url: SafeUrl;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public sanitizer: DomSanitizer,
    private location: Location,
    private doacaoService: DoacaoService
  ) {
  }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustUrl(this.location.path());


    this.doacaoService.consultarPorStatus('Ativa').subscribe(
      doacoes => {
        if (doacoes != null) {
          this.converterImagens(doacoes);
          this.doacoesAtivas = doacoes;
        }
      },
      erro => {
        const mensagem = 'Não foi possível consultar suas doações ativas.';
        this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      }
    );

    this.doacaoService.consultarPorStatus('Reservada').subscribe(
      doacoes => {
        if (doacoes != null) {
          this.converterImagens(doacoes);
          this.doacoesReservadas = doacoes;
        }
      },
      erro => {
        const mensagem = 'Não foi possível consultar suas doações reservadas.';
        this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      }
    );

    this.doacaoService.consultarPorStatus('Inativa').subscribe(
      doacoes => {
        if (doacoes != null) {
          this.converterImagens(doacoes);
          this.doacoesInativas = doacoes;
        }
      },
      erro => {
        const mensagem = 'Não foi possível consultar suas doações inativas.';
        this.snackBar.open(mensagem, 'Erro', { duration: 5000 });
      }
    );
  }

  public abrirEdicaoDoacao(doacaoSelecionada: DoacaoImagens) {
    const urlComponenteCadastro = '/doacoes/cadastro';
    this.router.navigateByUrl(urlComponenteCadastro, { state: {doacao: doacaoSelecionada} });
  }

  private converterImagens(doacoes: DoacaoImagens[]) {
    doacoes.forEach(doacao => {
      doacao.imagens.forEach(imagem => {
        imagem.safeUpload = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + imagem.upload);
      });
    });
  }

  public gerarUrlCompartilhamento(doacao: Doacao) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.facebook.com/plugins/share_button.php?href=https://move-roda.herokuapp.com/doacoes/detalhes/" +
      doacao.id + "&layout=button&size=small&width=105&height=20&appId");
  }
}
