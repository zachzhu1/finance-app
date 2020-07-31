import { TestBed } from '@angular/core/testing';

import { InfoStateService } from './info-state.service';

describe('InfoStateService', () => {
  let service: InfoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
