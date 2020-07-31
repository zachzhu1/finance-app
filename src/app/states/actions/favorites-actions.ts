import { createAction, props } from '@ngrx/store';
import { StockData } from '../reducers/dashboard-reducer';
import { CoreApiError } from 'src/app/common/state-service';


const CHANGE_ORDER = 'FAVORITES:CHANGE_ORDER';
const SORT_DATA = 'FAVORITES:SORT_DATA';
const FETCH_FULFILLED = 'FAVORITES:FETCH_FULFILLED';
const FETCH_LOADER = 'FAVORITES:FETCH_LOADER';
const FETCH_ERROR = 'FAVORITES:FETCH_ERROR';

export const changeOrder = createAction(CHANGE_ORDER, props<{order: string[]}>());
export const sortData = createAction(SORT_DATA);
export const fetchFulfilled = createAction(FETCH_FULFILLED, props<{data: StockData[]}>());
export const fetchLoader = createAction(FETCH_LOADER, props<{loader: boolean}>())
export const fetchError = createAction(FETCH_ERROR, props<{error: CoreApiError}>())


