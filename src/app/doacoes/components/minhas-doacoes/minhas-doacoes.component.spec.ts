import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasDoacoesComponent } from './minhas-doacoes.component';

describe('MinhasDoacoesComponent', () => {
  let component: MinhasDoacoesComponent;
  let fixture: ComponentFixture<MinhasDoacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasDoacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasDoacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
