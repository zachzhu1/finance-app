import { CoreApiError } from 'src/app/common/state-service';
import { createAction, props } from '@ngrx/store';

const FETCH_FULFILLED = 'SEARCH:FETCH_FULFILLED';
const FETCH_LOADER = 'SEARCH:FETCH_LOADER';
const FETCH_ERROR = 'SEARCH:FETCH_ERROR';

export const fetchFulfilled = createAction(FETCH_FULFILLED, props<{data: any[]}>());
export const fetchLoader = createAction(FETCH_LOADER, props<{loader: boolean}>())
export const fetchError = createAction(FETCH_ERROR, props<{error: CoreApiError}>())


