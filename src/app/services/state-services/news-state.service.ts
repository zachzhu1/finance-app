import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { StateService, AppState, CoreApiError } from 'src/app/common/state-service';
import { NewsStateKeys } from 'src/app/states/reducers/news-reducer';
import * as NewsActions from '../../states/actions/news-actions';

@Injectable({
  providedIn: 'root'
})
export class NewsStateService extends StateService {

  constructor(public store$: Store<AppState>) {
    super(store$, NewsStateKeys.StateName);
  }

  fetchFulfilled(data: any[]) {
    this.store$.dispatch(NewsActions.fetchFulfilled({data: data}));
  }

  fetchLoader(loader: boolean) {
    this.store$.dispatch(NewsActions.fetchLoader({loader: loader}));
  }

  fetchError(error: CoreApiError) {
    this.store$.dispatch(NewsActions.fetchError({error: error}));
  }
}
