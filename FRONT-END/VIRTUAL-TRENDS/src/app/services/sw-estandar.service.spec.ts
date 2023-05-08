import { TestBed } from '@angular/core/testing';

import { SwEstandarService } from './sw-estandar.service';

describe('SwEstandarService', () => {
  let service: SwEstandarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwEstandarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
