import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { StateService, AppState, CoreApiError } from 'src/app/common/state-service';
import { InfoStateKeys } from 'src/app/states/reducers/info-reducer';
import * as InfoActions from '../../states/actions/info-actions';

@Injectable({
  providedIn: 'root'
})
export class InfoStateService extends StateService {

  constructor(public store$: Store<AppState>) {
    super(store$, InfoStateKeys.StateName)
  }

  fetchFulfilled(data: any[]) {
    this.store$.dispatch(InfoActions.fetchFulfilled({data: data}));
  }

  fetchLoader(loader: boolean) {
    this.store$.dispatch(InfoActions.fetchLoader({loader: loader}));
  }

  fetchError(error: CoreApiError) {
    this.store$.dispatch(InfoActions.fetchError({error: error}));
  }
}