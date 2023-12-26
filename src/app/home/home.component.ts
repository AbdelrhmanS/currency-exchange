import { Component, OnInit } from '@angular/core';
import {CurrencyExchangeService} from "../currency-exchange.service";

const popularCurrencies = ['USD', 'EGP', 'SAR', 'AED', 'KRW', 'RUB', 'PLN', 'YER', 'AUD'];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rates: {[p: string]: number} = {};

  convertedCurrencies: {
    currency: string,
    amount?: number,
    rate?: number,
  }[] = popularCurrencies.map(currency => ({ currency }));

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
  ) { }

  ngOnInit(): void {
    this.getLatestConversionRates();
  }


  getLatestConversionRates() {
    this.currencyExchangeService.getLatestRates(popularCurrencies).subscribe((res: any) => {

      this.rates = res.rates;
    });

  }

  getConvertedValue(value: number) {
    this.convertedCurrencies = popularCurrencies.map(currency => ({
      currency,
      amount: this.rates[currency] * value,
      rate: this.rates[currency],
    }))
  }
}
