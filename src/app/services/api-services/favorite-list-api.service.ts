import { Injectable } from '@angular/core';
import { ResponseHandler } from 'src/app/common/response-handler';
import { CoreApiService } from './core-api.service';
import { FavoritesStateService } from '../state-services/favorites-state.service';
import { environment } from '../../../environments/environment';
import { get } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FavoriteListApiService extends ResponseHandler {
  private stocks: string[] = [];

  constructor(public apiService: CoreApiService, 
    public stateService: FavoritesStateService) {
    super(stateService);
}

  load(stocks: string[]) {
    this.stocks = stocks;
    this.toggleLoader(true);
    this.apiService.get(environment.paths.stocks.replace('$stocks', encodeURIComponent('"' + stocks.join('","') + '"')))
      .subscribe(
        data => this.complete(this.transform(data)),
        () => this.failed()
      );
  }

  reload() {
    this.load(this.stocks);
  }

  transform(data: any) {
    let stocks: any = get(data, 'query.results.quote', []);
    if (!Array.isArray(stocks)) {
      stocks = [stocks];
    }

    return stocks.map((quote: any) => {
      const change: number = Number(quote.Change) || 0.00;
      return {
        symbol: quote.symbol,
        name: quote.Name,
        price: Number(quote.LastTradePriceOnly),
        priceDisplay: Number(quote.LastTradePriceOnly).toFixed(2),
        change: this.getPlusSign(change) + change.toFixed(2),
        percentage: this.calculateChangePercent(change, quote.LastTradePriceOnly)
      };
    });
  }

  private calculateChangePercent(change: number, price: string): string {
    return this.getPlusSign(change) + (change / (Number(price) - change) * 100).toFixed(2) + '%';
  }

  private getPlusSign(change: number): string {
    return (change > 0) ? '+' : '';
  }
}
