import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDetalhesDoacaoComponent } from './consulta-detalhes-doacao.component';

describe('ConsultaDetalhesDoacaoComponent', () => {
  let component: ConsultaDetalhesDoacaoComponent;
  let fixture: ComponentFixture<ConsultaDetalhesDoacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaDetalhesDoacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDetalhesDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
