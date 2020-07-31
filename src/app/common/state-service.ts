import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { HeaderState } from 'src/app/states/reducers/header-reducer';
import { DashboardState } from 'src/app/states/reducers/dashboard-reducer';
import { FavoritesState } from 'src/app/states/reducers/favorites-reducer';
import { SidebarState } from 'src/app/states/reducers/sidebar-reducer';
import { SearchState } from 'src/app/states/reducers/search-reducer';
import { ChartState} from 'src/app/states/reducers/chart-reducer';
import { NewsState } from 'src/app/states/reducers/news-reducer';
import { InfoState } from 'src/app/states/reducers/info-reducer';

export abstract class StateService {
  data$: Observable<any[]>;
  loader$: Observable<boolean>;
  error$: Observable<CoreApiError>;

  constructor(protected store$: Store<AppState>, protected stateName: string) { 
    this.data$ = store$.pipe(
      map((state: AppState) => state[this.stateName].data), 
      distinctUntilChanged());

    this.loader$ = store$.pipe(
      map((state: AppState) => state[this.stateName].loader), 
      distinctUntilChanged());

    this.error$ = store$.pipe(
      map((state: AppState) => state[this.stateName].error), 
      distinctUntilChanged());
  }

  abstract fetchFulfilled(data: any[]): void;
  abstract fetchLoader(loader: boolean): void;
  abstract fetchError(error: CoreApiError): void;
}

export interface AppState {
  header: HeaderState,
  dashboard: DashboardState,
  favorites: FavoritesState,
  sidebar: SidebarState,
  search: SearchState,
  chart: ChartState,
  news: NewsState,
  info: InfoState
}

export interface CoreApiState {
  data?: any[];
  loader?: boolean;
  error?: CoreApiError;
}

export interface CoreApiError {
  value?: string;
  date?: string;
  count?: number;
}