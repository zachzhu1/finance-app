import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { StateService, AppState, CoreApiError } from 'src/app/common/state-service';
import { SearchStateKeys } from 'src/app/states/reducers/search-reducer';
import * as SearchActions from '../../states/actions/search-actions';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService extends StateService {

  constructor(public store$: Store<AppState>) {
    super(store$, SearchStateKeys.StateName)
  }

  fetchFulfilled(data: any[]) {
    this.store$.dispatch(SearchActions.fetchFulfilled({data: data}));
  }

  fetchLoader(loader: boolean) {
    this.store$.dispatch(SearchActions.fetchLoader({loader: loader}));
  }

  fetchError(error: CoreApiError) {
    this.store$.dispatch(SearchActions.fetchError({error: error}));
  }
}
