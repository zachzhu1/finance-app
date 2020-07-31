import { Action, createReducer, on } from '@ngrx/store';
import * as FavoritesActions  from '../actions/favorites-actions';
import { sortBy } from 'lodash';
import { localStorageAdapter, Types } from 'src/app/common/utils';
import { CoreApiState } from 'src/app/common/state-service';
import { StockData } from './dashboard-reducer';

export interface FavoritesState extends CoreApiState {
  order?: string[];
}

export class FavoritesStateKeys {
  static StateName = 'favorites';
  static Order = 'order';
}

const favoritesInitialState = {
  order: localStorageAdapter.getItem(FavoritesStateKeys.Order, Types.Array) || [],
  data: [],
  loader: false,
  error: null
};

const reducer = createReducer<FavoritesState>(
  favoritesInitialState,
  on(FavoritesActions.changeOrder, (state, { order })=>({...state, order:order})),
  on(FavoritesActions.sortData, (state)=>({...state, data:sortBy(state.data)})),
  on(FavoritesActions.fetchFulfilled, (state, { data })=>({...state, data:data})),
  on(FavoritesActions.fetchLoader, (state, { loader })=>({...state, loader:loader})),
  on(FavoritesActions.fetchError, (state, { error })=>({...state, error:error}))
)

export function favoritesReducer(state: FavoritesState | undefined, action: Action) {
  return reducer(state, action);
}

export function sortData(data: StockData[], order: string[]): StockData[] {
  data = data.map((item: StockData) => {
    let index: number = order.indexOf(item.symbol);
    if (index < 0) {
      index = 999;
    }
    item.index = index;
    return item;
  });
  return sortBy(data, ['index']);
}
