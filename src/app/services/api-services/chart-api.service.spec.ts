import { TestBed } from '@angular/core/testing';

import { ChartApiService } from './chart-api.service';

describe('ChartApiService', () => {
  let service: ChartApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
