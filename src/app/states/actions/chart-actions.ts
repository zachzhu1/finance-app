import { createAction, props } from '@ngrx/store';
import { CoreApiError } from 'src/app/common/state-service';
import { ChartDataInterface } from '../reducers/chart-reducer';

const CHANGE_POINT = 'CHART:CHANGE_POINT';
const CHANGE_RANGE = 'CHART:CHANGE_RANGE';
const FETCH_FULFILLED = 'CHART:FETCH_FULFILLED';
const FETCH_LOADER = 'CHART:FETCH_LOADER';
const FETCH_ERROR = 'CHART:FETCH_ERROR';

export const changePoint = createAction(CHANGE_POINT, props<{point: ChartDataInterface}>());
export const changeRange = createAction(CHANGE_RANGE, props<{range: string}>());
export const fetchFulfilled = createAction(FETCH_FULFILLED, props<{data: ChartDataInterface[]}>());
export const fetchLoader = createAction(FETCH_LOADER, props<{loader: boolean}>())
export const fetchError = createAction(FETCH_ERROR, props<{error: CoreApiError}>())
