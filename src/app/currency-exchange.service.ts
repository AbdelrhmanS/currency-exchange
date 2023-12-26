import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  constructor(
    private http: HttpClient,
  ) { }

  getCurrencies<T>() {
    const api = environment.apiKey;
    return this.http.get<T>(`${environment.baseURL}/symbols?access_key=${environment.apiKey}`);
  }

  getRates<T>(base: string, to: string) {
    let url = `${environment.baseURL}/latest?access_key=${environment.apiKey}`;
    url += `&base=${base}`;
    url += `&symbols=${to}`;

    return this.http.get<T>(url);
  }

  getLatestRates(currencies: string[]) {
    let url = `${environment.baseURL}/latest?access_key=${environment.apiKey}`;
    url += `&symbols=${currencies.join(',')}`;

    return this.http.get(url);
  }

  getHistoricalData(base: string, to: string, startDate: string, endDate: string) {
    let url = `${environment.baseURL}/timeseries?access_key=${environment.apiKey}`;
    url += `&symbols=${to}`;
    url += `&base=${base}`;
    url += `&start_date=${startDate}`;
    url += `&end_date=${endDate}`;

    return this.http.get(url);
  }

  getHistoricalDate(base: string, to: string, date: string) {
    let url = `${environment.baseURL}/${date}?access_key=${environment.apiKey}`;
    url += `&symbols=${to}`;
    url += `&base=${base}`;

    return this.http.get(url);
  }
}
