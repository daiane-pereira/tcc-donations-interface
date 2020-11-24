import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'autenticacao',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
  },
  {
    path: 'doacoes',
    loadChildren: () => import('./doacoes/doacoes.module').then(m => m.DoacoesModule)
  },
  {
    path: '**',
    redirectTo: 'doacoes'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
