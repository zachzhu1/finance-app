import { Action, createReducer, on } from '@ngrx/store';
import * as SidebarActions from '../actions/sidebar-actions';

export enum SidebarTypeEnum {
  List,
  Edit,
  Add
}

export interface SidebarState {
  sidebarType?: SidebarTypeEnum;
}

export class SidebarStateKeys {
  static StateName = 'sidebar';
  static Type = 'type';
}

const sidebarInitialState = {
  sidebarType: SidebarTypeEnum.List
};

const reducer = createReducer<SidebarState>(
  sidebarInitialState,
  on(SidebarActions.changeType, (state, { sidebarType })=>({...state, sidebarType:sidebarType})),
)

export function sidebarReducer(state: SidebarState | undefined, action: Action) {
  return reducer(state, action);
}
