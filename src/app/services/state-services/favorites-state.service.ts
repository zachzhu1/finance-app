import { Injectable } from '@angular/core';
import { StateService, AppState, CoreApiError } from 'src/app/common/state-service';
import { Observable } from 'rxjs';
import { FavoritesStateKeys } from 'src/app/states/reducers/favorites-reducer';
import { Store } from '@ngrx/store';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as FavoritesActions from '../../states/actions/favorites-actions';

@Injectable({
  providedIn: 'root'
})
export class FavoritesStateService extends StateService {
  order$: Observable<string[]>;

  constructor(public store$: Store<AppState>) {
    super(store$, FavoritesStateKeys.StateName);

    this.order$ = store$.pipe(      
      map((state: AppState) => state.favorites.order), 
      distinctUntilChanged());
  }

  fetchFulfilled(data: any[]) {
    this.store$.dispatch(FavoritesActions.fetchFulfilled({data: data}));
  }

  fetchLoader(loader: boolean) {
    this.store$.dispatch(FavoritesActions.fetchLoader({loader: loader}));
  }

  fetchError(error: CoreApiError) {
    this.store$.dispatch(FavoritesActions.fetchError({error: error}));
  }

  changeOrder(order: string[]) {
    this.store$.dispatch(FavoritesActions.changeOrder({ order: order}));
  }

  sortData() {
    this.store$.dispatch(FavoritesActions.sortData());
  }
}