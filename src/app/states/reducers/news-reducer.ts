import { Action, createReducer, on } from '@ngrx/store';
import { CoreApiState } from 'src/app/common/state-service';
import * as NewsActions from '../actions/news-actions';

export interface NewsState extends CoreApiState {
}

export class NewsStateKeys {
  static StateName = 'news';
}

export interface NewsDataInterface {
  source?: string;
  date?: string;
  title?: string;
  url?: string;
  image?: string;
}

const newsInitialState = {
  data: [],
  loader: false,
  error: null
};

const reducer = createReducer<NewsState>(
  newsInitialState,
  on(NewsActions.fetchFulfilled, (state, { data })=>({...state, data:data})),
  on(NewsActions.fetchLoader, (state, { loader })=>({...state, loader:loader})),
  on(NewsActions.fetchError, (state, { error })=>({...state, error:error}))
)

export function newsReducer(state: NewsState | undefined, action: Action) {
  return reducer(state, action);
}