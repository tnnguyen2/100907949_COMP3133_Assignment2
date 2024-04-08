import { TestBed } from '@angular/core/testing';

import { AunthenicationService } from './authentication.service';

describe('AunthenicationService', () => {
  let service: AunthenicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AunthenicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
