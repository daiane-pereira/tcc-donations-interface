import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDoacoesComponent } from './consulta-doacoes.component';

describe('ConsultaDoacoesComponent', () => {
  let component: ConsultaDoacoesComponent;
  let fixture: ComponentFixture<ConsultaDoacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaDoacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDoacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
