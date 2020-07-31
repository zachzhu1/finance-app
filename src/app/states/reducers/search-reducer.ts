import { Action, createReducer, on } from '@ngrx/store';
import { CoreApiState } from 'src/app/common/state-service';
import * as SearchActions from '../actions/search-actions';

export interface SearchState extends CoreApiState {
}

export class SearchStateKeys {
  static StateName = 'search';
}

export const searchInitialState = {
  data: [],
  loader: false,
  error: null
};


const reducer = createReducer<SearchState>(
  searchInitialState,
  on(SearchActions.fetchFulfilled, (state, { data })=>({...state, data:data})),
  on(SearchActions.fetchLoader, (state, { loader })=>({...state, loader:loader})),
  on(SearchActions.fetchError, (state, { error })=>({...state, error:error}))
)

export function searchReducer(state: SearchState | undefined, action: Action) {
  return reducer(state, action);
}