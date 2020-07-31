import { SidebarTypeEnum } from '../reducers/sidebar-reducer';
import { createAction, props } from '@ngrx/store';


const CHANGE_TYPE = 'SIDEBAR:CHANGE_TYPE';
export const changeType = createAction(CHANGE_TYPE, props<{ sidebarType: SidebarTypeEnum }>());


