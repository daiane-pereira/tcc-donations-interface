import {Component, OnInit} from '@angular/core';
import {DoacaoImagens} from '../../../model/doacao-imagens';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {DoacaoService} from '../../../service/doacao.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-consulta-detalhes-doacao',
  templateUrl: './consulta-detalhes-doacao.component.html',
  styleUrls: ['./consulta-detalhes-doacao.component.scss']
})
export class ConsultaDetalhesDoacaoComponent implements OnInit {

  public doacao: DoacaoImagens;
  public localizacao: string;
  public doacaoId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activated: ActivatedRoute,
    private snackBar: MatSnackBar,
    public sanitizer: DomSanitizer,
    private doacaoService: DoacaoService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.router);
    console.log(this.activated);
    this.activated.params.subscribe(params => {
      this.doacaoId = params['doacaoId'];
      console.log(params);
    });

    this.doacaoService.consultarPorId(this.doacaoId).subscribe(
      doacao => {
        this.doacao = doacao;
        this.formatarLocalizacao();
        this.doacao.imagens.forEach(imagem => {
          imagem.safeUpload = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + imagem.upload);
        });
      },
      erro => {
        this.snackBar.open('Erro maroto!', 'Erro', { duration: 5000 });
      }
    );
  }

  public usuarioAutenticado(): boolean {
    return !!this.authService.getUsuario();
  }

  private formatarLocalizacao() {
     this.localizacao = this.doacao.bairro.nome + ' , ' + this.doacao.cidade.nome + ' - ' + this.doacao.estado.nome;
  }

}
