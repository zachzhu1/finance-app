import { Injectable } from '@angular/core';
import { get } from 'lodash';

import { ResponseHandler } from 'src/app/common/response-handler';
import { CoreApiService } from './core-api.service';
import { SearchStateService } from '../state-services/search-state.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService extends ResponseHandler {
  private stock: string;

  constructor(public apiService: CoreApiService, 
    public stateService: SearchStateService) {
    super(stateService);
  }


  load(stock: string, env: any = environment) {
    this.stock = stock;
    this.toggleLoader(true);
    if (env.production) {
      this.apiService.post(env.paths.proxy, 'url=' + encodeURIComponent(env.paths.search.replace('$stock', encodeURIComponent(stock))))
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    } else {
      this.apiService.get(env.paths.search)
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    }
  }

  reload() {
    this.load(this.stock);
  }

  transform(data: any): any[] {
    return get(data, 'data.items', []);
  }
}

