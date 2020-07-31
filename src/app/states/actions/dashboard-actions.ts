import { StockData } from '../reducers/dashboard-reducer';
import { createAction, props } from '@ngrx/store';

const CHANGE_STOCK_DATA = 'DASHBOARD:CHANGE_STOCK_DATA';
const CHANGE_STOCK = 'DASHBOARD:CHANGE_STOCK';
const DELETE_FAVORITES = 'DASHBOARD:DELETE_FAVORITES';
const ADD_FAVORITE = 'DASHBOARD:ADD_FAVORITE';
const CHANGE_HIGHLIGHTS = 'DASHBOARD:CHANGE_HIGHLIGHTS';

export const changeStockData = createAction(CHANGE_STOCK_DATA, props<{data: StockData}>());
export const changeStock = createAction(CHANGE_STOCK, props<{stock: string}>());
export const addFavorite = createAction(ADD_FAVORITE, props<{favorite: string}>());
export const deleteFavorites = createAction(DELETE_FAVORITES, props<{favorites: string[]}>());
export const changeHighlights = createAction(CHANGE_HIGHLIGHTS, props<{highlights: any}>());
