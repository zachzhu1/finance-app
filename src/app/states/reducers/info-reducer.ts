import { Action, createReducer, on } from '@ngrx/store';
import { CoreApiState } from 'src/app/common/state-service';
import * as InfoActions from '../actions/info-actions';

export interface InfoState extends CoreApiState {
}

export class InfoStateKeys {
  static StateName = 'info';
}

export interface InfoDataInterface {
  PreviousClose?: number;
  DaysLow?: number;
  YearLow?: number;
  MarketCapitalization?: string;
  OneyrTargetPrice?: number;
  EarningsShare?: string;
  Open?: number;
  DaysHigh?: number;
  YearHigh?: number;
  Volume?: string;
  AverageDailyVolume?: string;
  DividendShare?: string;
  LastTradePriceOnly?: number;
}

const infoInitialState = {
  data: [],
  loader: false,
  error: null
};

const reducer = createReducer<InfoState>(
  infoInitialState,
  on(InfoActions.fetchFulfilled, (state, { data })=>({...state, data:data})),
  on(InfoActions.fetchLoader, (state, { loader })=>({...state, loader:loader})),
  on(InfoActions.fetchError, (state, { error })=>({...state, error:error}))
)

export function infoReducer(state: InfoState | undefined, action: Action) {
  return reducer(state, action);
}