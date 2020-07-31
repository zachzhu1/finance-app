import { TestBed } from '@angular/core/testing';

import { NewsStateService } from './news-state.service';

describe('NewsStateService', () => {
  let service: NewsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
