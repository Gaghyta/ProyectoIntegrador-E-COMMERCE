import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallaPersonalizadaComponent } from './talla-personalizada.component';

describe('TallaPersonalizadaComponent', () => {
  let component: TallaPersonalizadaComponent;
  let fixture: ComponentFixture<TallaPersonalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallaPersonalizadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallaPersonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
