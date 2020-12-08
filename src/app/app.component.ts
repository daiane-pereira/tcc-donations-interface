import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private titleService: Title,
    private metaTagService: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Move a Roda');

    this.metaTagService.addTags([
      {name: 'og:title', content: 'Move a Roda — Doe e receba doações'},
      {name: 'og:description', content: 'Fazer uma doação é um ato benéfico para a sociedade e para o meio ambiente. Realize uma doação' +
          ' um pertence que não utilizam mais, ou busque por objetos, roupas e outros produtos que estejam sendo cedidos.'}
    ]);
  }
}
