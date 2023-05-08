import { TestBed } from '@angular/core/testing';

import { SwPersonalizadoService } from './sw-personalizado.service';

describe('SwPersonalizadoService', () => {
  let service: SwPersonalizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwPersonalizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
