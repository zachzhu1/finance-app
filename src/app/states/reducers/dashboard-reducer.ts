import { Action, createReducer, on } from '@ngrx/store';
import * as DashboardActions from '../actions/dashboard-actions';
import { localStorageAdapter, Types } from 'src/app/common/utils';

export interface StockData {
  index?: number;
  symbol?: string;
  name?: string;
  price?: number;
  priceDisplay?: string;
  change?: number;
  percentage?: string;
}

export interface DashboardState {
  stock?: string;
  stockData?: StockData;
  favorites?: string[];
  highlights?: any;
}

export class DashboardStateKeys {
  static StateName = 'dashboard';
  static Stock = 'stock';
  static StockData = 'stockData';
  static Favorites = 'favorites';
  static Highlights = 'highlights';
}

const dashboardInitialState: DashboardState = {
  stock: null,
  stockData: {},
  favorites: localStorageAdapter.getItem(DashboardStateKeys.Favorites, Types.Array) || ['AAPL', 'GOOG', 'FB'],
  highlights: {}
};

const reducer = createReducer<DashboardState>(
  dashboardInitialState,
  on(DashboardActions.changeStockData, (state, { data })=>({...state, data:data})),
  on(DashboardActions.changeStock, (state, { stock })=>({...state, stock:stock})),
  on(DashboardActions.addFavorite, (state, { favorite }) => {
    if(state.favorites.indexOf(favorite) == -1){
      state.favorites.push(favorite);
    }
    return state;
  }),
  on(DashboardActions.deleteFavorites, (state, { favorites })=>{
    state.favorites.filter(x => favorites.indexOf(x) === -1);
    return state;
  }),
  on(DashboardActions.changeHighlights, (state, { highlights })=>({...state, highlights:highlights})),
);

export function dashboardReducer(state: DashboardState | undefined, action: Action) {
  return reducer(state, action);
}