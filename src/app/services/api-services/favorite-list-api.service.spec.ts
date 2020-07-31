import { TestBed } from '@angular/core/testing';

import { FavoriteListApiService } from './favorite-list-api.service';

describe('FavoriteListApiService', () => {
  let service: FavoriteListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
