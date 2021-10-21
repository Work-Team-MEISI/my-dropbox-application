import { TestBed } from '@angular/core/testing';

import { HttpSpinnerService } from './http-spinner.service';

describe('HttpSpinnerService', () => {
  let service: HttpSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
