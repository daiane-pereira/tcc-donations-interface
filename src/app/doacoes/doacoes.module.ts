import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ConsultaDoacoesComponent} from './components/consulta-doacoes/consulta-doacoes.component';
import {MinhasDoacoesComponent} from './components/minhas-doacoes/minhas-doacoes.component';
import {DoacoesRoutingModule} from './doacoes-routing.module';
import {DoacoesComponent} from './doacoes.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {CadastroDoacaoComponent} from './components/cadastro-doacao/cadastro-doacao.component';
import {ConsultaDetalhesDoacaoComponent} from './components/consulta-detalhes-doacao/consulta-detalhes-doacao.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    DoacoesComponent,
    ConsultaDoacoesComponent,
    MinhasDoacoesComponent,
    CadastroDoacaoComponent,
    ConsultaDetalhesDoacaoComponent
  ],
  imports: [
    CommonModule,
    DoacoesRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatCardModule,
    RouterModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
  ],
})
export class DoacoesModule { }
