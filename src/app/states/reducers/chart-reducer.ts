import * as ChartActions from '../actions/chart-actions';
import { Action, createReducer, on } from '@ngrx/store';
import { localStorageAdapter, Types } from 'src/app/common/utils';
import { CoreApiState } from 'src/app/common/state-service';

export interface ChartDataInterface {
  timestamp?: number;
  date?: Date;
  close?: number;
  high?: number;
  low?: number;
  open?: number;
  volume?: number;
}

export interface ChartState extends CoreApiState {
  point?: ChartDataInterface;
  range?: string;
}

export class ChartStateKeys {
  static StateName = 'chart';
  static Point = 'point';
  static Range = 'range';
}

const chartInitialState = {
  point: {},
  range: localStorageAdapter.getItem(ChartStateKeys.Range, Types.String) || '3mo',
  data: [],
  loader: false,
  error: null
};

const reducer = createReducer<ChartState>(
  chartInitialState,
  on(ChartActions.changePoint, (state, { point })=>({...state, point:point})),
  on(ChartActions.changeRange, (state, { range })=>({...state, range:range})),
  on(ChartActions.fetchFulfilled, (state, { data })=>({...state, data:data})),
  on(ChartActions.fetchLoader, (state, { loader })=>({...state, loader:loader})),
  on(ChartActions.fetchError, (state, { error })=>({...state, error:error}))
)

export function chartReducer(state: ChartState | undefined, action: Action) {
  return reducer(state, action);
}
