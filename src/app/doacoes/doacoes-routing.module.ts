import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/auth.guard';
import { CadastroDoacaoComponent } from './components/cadastro-doacao/cadastro-doacao.component';
import { ConsultaDetalhesDoacaoComponent } from './components/consulta-detalhes-doacao/consulta-detalhes-doacao.component';
import { ConsultaDoacoesComponent } from './components/consulta-doacoes/consulta-doacoes.component';
import { MinhasDoacoesComponent } from './components/minhas-doacoes/minhas-doacoes.component';
import { DoacoesComponent } from './doacoes.component';

const routes: Routes = [
  {
    path: '',
    component: DoacoesComponent,
    children: [
      {
        path: 'minhas-doacoes',
        component: MinhasDoacoesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cadastro',
        canActivate: [AuthGuard],
        component: CadastroDoacaoComponent,
      },
      {
        path: 'detalhes/:doacaoId',
        component: ConsultaDetalhesDoacaoComponent,
      },
      {
        path: 'consulta',
        component: ConsultaDoacoesComponent,
      },
      {
        path: '**',
        redirectTo: 'consulta',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoacoesRoutingModule { }
