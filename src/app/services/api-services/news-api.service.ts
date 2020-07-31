import { Injectable } from '@angular/core';
import { get } from 'lodash';
import * as moment from 'moment';

import { CoreApiService } from './core-api.service';
import { ResponseHandler } from 'src/app/common/response-handler';
import { NewsStateService } from '../state-services/news-state.service';
import { environment } from '../../../environments/environment';
import { NewsDataInterface } from 'src/app/states/reducers/news-reducer';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService extends ResponseHandler {
  private stock: string;

  constructor(public apiService: CoreApiService, 
              public stateService: NewsStateService) {
    super(stateService);
  }

  load(stock: string, env: any = environment) {
    this.stock = stock;
    this.toggleLoader(true);
    const url: string = env.paths.news.replace('$stock', encodeURIComponent(stock));
    if (env.production) {
      this.apiService.post(env.paths.proxy, 'url=' + encodeURIComponent(url))
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    } else {
      this.apiService.get(url)
        .subscribe(
          data => this.complete(this.transform(data)),
          () => this.failed()
        );
    }
  }

  reload() {
    this.load(this.stock);
  }

  transform(data: any): NewsDataInterface[] {
    const news: any[] = get(data, 'Content.result', []);
    return news.map((item: any) => {
      return {
        source: item.provider_name,
        date: this.convertDate(item.provider_publish_time),
        title: item.title,
        url: item.url,
        image: item.thumbnail
      };
    });
  }

  private convertDate(date: number): string {
    return moment(date * 1000).format('ddd, MMM Do YYYY h:mm A');
  }
}