import { InfoDataInterface } from '../reducers/info-reducer';
import { createAction, props } from '@ngrx/store';
import { CoreApiError } from 'src/app/common/state-service';

const FETCH_FULFILLED = 'INFO:FETCH_FULFILLED';
const FETCH_LOADER = 'INFO:FETCH_LOADER';
const FETCH_ERROR = 'INFO:FETCH_ERROR';

export const fetchFulfilled = createAction(FETCH_FULFILLED, props<{data: InfoDataInterface[]}>());
export const fetchLoader = createAction(FETCH_LOADER, props<{loader: boolean}>())
export const fetchError = createAction(FETCH_ERROR, props<{error: CoreApiError}>())

