import { StateService, CoreApiError } from './state-service';

export abstract class ResponseHandler {
  disableLoader: boolean;
  errorCount = 0;

  constructor(protected stateService: StateService) { 
  }

  toggleLoader(loader: boolean) {
    if (!this.disableLoader) {
      this.stateService.fetchLoader(loader);
    }
  }

  complete(data: any[]) {
    this.disableLoader = false;
    if (data.length > 0) {
      this.errorCount = 0;
      this.toggleLoader(false);
      this.stateService.fetchFulfilled(data);
    } else {
      this.failed('Yahoo\'s API didn\'t return any data.');
    }
  }

  failed(error: string = null) {
    if (!this.disableLoader) {
      this.errorCount++;

      if (!error) {
        error = 'Yahoo\'s API was unable to load.';
        if (this.errorCount > 3) {
          error = 'Yahoo\'s API failed multiple times.  Please wait a minute before trying again.';
        }
      }

      this.stateService.fetchError(<CoreApiError>{
        value: error,
        date: String(Date.now()),
        count: this.errorCount
      });
    }
  }
  
  abstract reload(): void;

  /**
   * 
   * @param rawData raw data retrieved via APIs
   */
  abstract transform(rawData: any): any[];
}
