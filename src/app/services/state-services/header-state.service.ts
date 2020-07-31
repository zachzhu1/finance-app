import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import * as HeaderActions from 'src/app/states/actions/header-actions';
import { AppState } from 'src/app/common/state-service';

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService {
  searchActive$: Observable<boolean>;
  search$: Observable<string>;
  sidebar$: Observable<boolean>;
  preloader$: Observable<boolean>;

  constructor(public store$: Store<AppState>) {
    this.searchActive$ = store$.pipe(
      map((state: AppState)=> state.header.searchActive),
      distinctUntilChanged());

    this.search$ = store$.pipe(
      map((state: AppState) => state.header.search), 
      distinctUntilChanged());

    this.sidebar$ = store$.pipe(
      map((state: AppState) => state.header.sidebar), 
      distinctUntilChanged());

    this.preloader$ = store$.pipe(
      map((state: AppState) => state.header.preloader), 
      distinctUntilChanged());

  }

  changeSearchActive(searchActive: boolean) {
    this.store$.dispatch(HeaderActions.changeSearchActive({searchActive: searchActive}));
  }

  changeSearch(search: string) {
    this.store$.dispatch(HeaderActions.changeSearch({search: search}));
  }

  changeSidebar(sidebar: boolean) {
    this.store$.dispatch(HeaderActions.changeSidebar({sidebar: sidebar}));
  }

  changePreloader(preloader: boolean) {
    this.store$.dispatch(HeaderActions.changePreloader({preloader: preloader}));
  }
}

