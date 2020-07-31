import { Action, createReducer, on } from '@ngrx/store';
import * as HeaderActions from '../actions/header-actions';

export interface HeaderState {
  searchActive?: boolean;
  search?: string;
  sidebar?: boolean;
  preloader?: boolean;
}

const headerInitialState = {
  searchActive: false,
  search: null,
  sidebar: true,
  preloader: true
};

const reducer = createReducer<HeaderState>(
  headerInitialState,
  on(HeaderActions.changeSearchActive, (state, { searchActive })=>({...state, searchActive:searchActive})),
  on(HeaderActions.changeSearch, (state, { search })=>({...state, search:search})),
  on(HeaderActions.changeSidebar, (state, { sidebar })=>({...state, sidebar:sidebar})),
  on(HeaderActions.changePreloader, (state, { preloader })=>({...state, preloader:preloader})),
)

export function headerReducer(state: HeaderState | undefined, action: Action) {
  return reducer(state, action);
}


