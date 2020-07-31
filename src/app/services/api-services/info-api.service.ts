import { Injectable } from '@angular/core';
import { get } from 'lodash';

import { CoreApiService } from './core-api.service';
import { ResponseHandler } from 'src/app/common/response-handler';
import { InfoStateService } from '../state-services/info-state.service';
import { InfoDataInterface } from 'src/app/states/reducers/info-reducer';
import { numberUnitFormat } from 'src/app/common/utils';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoApiService extends ResponseHandler {
  private stock: string;

  constructor(public apiService: CoreApiService, 
              public stateService: InfoStateService) {
    super(stateService);
  }

  load(stock: string) {
    this.stock = stock;
    this.toggleLoader(true);
    this.apiService.get(environment.paths.info.replace('$stock', encodeURIComponent(stock)))
      .subscribe(
        data => this.complete(this.transform(data)),
        () => this.failed()
      );
  }

  reload() {
    this.load(this.stock);
  }

  transform(rawData: any): InfoDataInterface[] {
    const data: InfoDataInterface[] = [];
    const info: any = get(rawData, 'query.results.quote');
    if (info) {
      info.Volume = numberUnitFormat(info.Volume, 2);
      info.AverageDailyVolume = numberUnitFormat(info.AverageDailyVolume, 2);
      data.push(info);
    }

    return data;
  }
}
