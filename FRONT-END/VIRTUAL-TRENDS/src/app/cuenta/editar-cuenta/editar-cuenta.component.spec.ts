import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCuentaComponent } from './editar-cuenta.component';

describe('EditarCuentaComponent', () => {
  let component: EditarCuentaComponent;
  let fixture: ComponentFixture<EditarCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCuentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
