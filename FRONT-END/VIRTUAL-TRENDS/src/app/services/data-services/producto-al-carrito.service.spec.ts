import { TestBed } from '@angular/core/testing';

import { ProductoAlCarritoService } from './producto-al-carrito.service';

describe('ProductoAlCarritoService', () => {
  let service: ProductoAlCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoAlCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
