import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaDelCarritoComponent } from './pantalla-del-carrito.component';

describe('PantallaDelCarritoComponent', () => {
  let component: PantallaDelCarritoComponent;
  let fixture: ComponentFixture<PantallaDelCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaDelCarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaDelCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
