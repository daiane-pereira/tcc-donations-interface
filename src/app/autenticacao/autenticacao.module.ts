import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AutenticacaoRoutingModule} from './autenticacao-routing.module';
import {AutenticacaoComponent} from './autenticacao.component';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LoginComponent} from './components/login/login.component';
import {CadastroContaComponent} from './components/cadastro-conta/cadastro-conta.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [AutenticacaoComponent, LoginComponent, CadastroContaComponent],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    MatListModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class AutenticacaoModule { }
