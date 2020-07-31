
import { get } from 'lodash';
import { StockData } from 'src/app/states/reducers/dashboard-reducer';

export class FavoritesHighlightService {
  getHighlights(stocks: StockData[], lastLoadedData: any): any {
    const data: any = {};

    stocks.forEach((stock: StockData) => {
      data[stock.symbol] = {
        price: this.getHighlight(stock.price, Number(get(lastLoadedData, stock.symbol + '.price')))
      };
    });

    return data;
  }

  getLastLoadedData(stocks: StockData[]): any {
    const data: any = {};

    stocks.forEach((stock: StockData) => {
      data[stock.symbol] = {
        price: stock.price
      };
    });

    return data;
  }

  private getHighlight(value: number, prevValue: number): string {
    let highlight: string;
    if (!isNaN(value) && !isNaN(prevValue) && value !== prevValue) {
      highlight = (value > prevValue) ? 'mdl-color--green-A100' : 'mdl-color--red-100';
    }
    return highlight;
  }
}
