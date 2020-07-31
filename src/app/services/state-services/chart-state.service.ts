import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { StateService, AppState, CoreApiError } from 'src/app/common/state-service';
import { ChartDataInterface, ChartStateKeys } from 'src/app/states/reducers/chart-reducer';
import * as ChartActions from '../../states/actions/chart-actions';

@Injectable({
  providedIn: 'root'
})
export class ChartStateService extends StateService {
  point$: Observable<ChartDataInterface>;
  range$: Observable<string>;

  constructor(public store$: Store<AppState>) {
    super(store$, ChartStateKeys.StateName);

    this.point$ = store$.pipe(      
      map((state: AppState) => state.chart.point), 
      distinctUntilChanged());

    this.range$ = store$.pipe(      
      map((state: AppState) => state.chart.range), 
      distinctUntilChanged());
  }

  fetchFulfilled(data: any[]) {
    this.store$.dispatch(ChartActions.fetchFulfilled({data: data}));
  }

  fetchLoader(loader: boolean) {
    this.store$.dispatch(ChartActions.fetchLoader({loader: loader}));
  }

  fetchError(error: CoreApiError) {
    this.store$.dispatch(ChartActions.fetchError({error: error}));
  }

  changePoint(point: ChartDataInterface) {
    this.store$.dispatch(ChartActions.changePoint({point: point}));
  }

  changeRange(range: string) {
    this.store$.dispatch(ChartActions.changeRange({range: range}));
  }
}

