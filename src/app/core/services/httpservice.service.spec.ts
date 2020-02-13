import { TestBed } from '@angular/core/testing';

import { HttpService } from 'src/app/core/services/httpservice.service';

describe('HttpserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
