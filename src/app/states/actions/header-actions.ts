import { createAction, props } from '@ngrx/store';

const ACTIVATE_SEARCH = 'HEADER:ACTIVATE_SEARCH';
const CHANGE_SEARCH = 'HEADER:CHANGE_SEARCH';
const CHANGE_SIDEBAR = 'HEADER:CHANGE_SIDEBAR';
const CHANGE_PRELOADER = 'HEADER:CHANGE_PRELOADER';

export const changeSearchActive = createAction(ACTIVATE_SEARCH, props<{searchActive: boolean}>());
export const changeSearch = createAction(CHANGE_SEARCH, props<{search: string}>());
export const changeSidebar = createAction(CHANGE_SIDEBAR, props<{sidebar: boolean}>());
export const changePreloader = createAction(CHANGE_PRELOADER, props<{preloader: boolean}>())


