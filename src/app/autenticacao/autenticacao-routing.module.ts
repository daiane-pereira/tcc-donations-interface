import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutenticacaoComponent } from './autenticacao.component';
import {CadastroContaComponent} from './components/cadastro-conta/cadastro-conta.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AutenticacaoComponent,
    children: [
      {
        path: 'conta',
        component: CadastroContaComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }
