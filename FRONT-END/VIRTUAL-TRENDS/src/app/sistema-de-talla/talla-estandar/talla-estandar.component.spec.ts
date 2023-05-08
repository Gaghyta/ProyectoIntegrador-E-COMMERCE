import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallaEstandarComponent } from './talla-estandar.component';

describe('TallaEstandarComponent', () => {
  let component: TallaEstandarComponent;
  let fixture: ComponentFixture<TallaEstandarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallaEstandarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallaEstandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
