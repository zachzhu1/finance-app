import { createAction, props } from '@ngrx/store';
import { CoreApiError } from 'src/app/common/state-service';
import { NewsDataInterface } from '../reducers/news-reducer';

const FETCH_FULFILLED = 'NEWS:FETCH_FULFILLED';
const FETCH_LOADER = 'NEWS:FETCH_LOADER';
const FETCH_ERROR = 'NEWS:FETCH_ERROR';

export const fetchFulfilled = createAction(FETCH_FULFILLED, props<{data: NewsDataInterface[]}>());
export const fetchLoader = createAction(FETCH_LOADER, props<{loader: boolean}>())
export const fetchError = createAction(FETCH_ERROR, props<{error: CoreApiError}>())



