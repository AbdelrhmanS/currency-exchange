import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CurrencyExchangeService} from '../currency-exchange.service';
import {ActivatedRoute} from '@angular/router';
import {forkJoin} from 'rxjs';
import {first, map} from 'rxjs/operators';


export interface CurrenciesRes {
  success: boolean;
  symbols: {[p: string]: string};
}

export interface RateRes {
  success: boolean,
  timestamp: number,
  base: string,
  date: string,
  rates: {[p: string]: number};
}


@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit {

  @Input('baseCurrency') baseCurrency: string;
  @Input('targetCurrency') targetCurrency: string;
  @Input('isHome') isHome: boolean;

  @Output('onConvert') onConvert: EventEmitter<number> = new EventEmitter<number>();

  converterForm: FormGroup;
  currencies: string[] = [];
  currenciesMap: {[p: string]: string} = {};
  currentConversionRate: number;
  convertedAmount: number;
  currentAmount: number;

  constructor(
    private formBuilder: FormBuilder,
    private currencyExchangeService: CurrencyExchangeService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const observables: any = {
      currencies: this.getCurrencies(),
    };

    if(!this.isHome) {
      observables.params = this.getParams().pipe(first());
      observables.getQueryParams = this.getQueryParams().pipe(first());
    }

    forkJoin(observables).subscribe(()=> {
      this.initForm();
    });
  }

  getParams() {
    return this.activatedRoute.params.pipe(map(params => {
      this.baseCurrency = params.baseCurrency;
      this.targetCurrency = params.targetCurrency;
    }))
  }

  getQueryParams() {
    return this.activatedRoute.queryParams.pipe(map(params => {
      this.currentAmount = params.amount;
    }))
  }

  initForm() {
    this.converterForm = this.formBuilder.group({
      base: [this.baseCurrency, [Validators.required]],
      to: [this.targetCurrency, [Validators.required]],
      amount: [this.currentAmount || 0, [Validators.required]]
    });
    this.getConversionRate();
  }

  getCurrencies() {
    return this.currencyExchangeService.getCurrencies<CurrenciesRes>().pipe(map(res => {
      if(res.success) {
        this.currencies = Object.keys(res.symbols);
        this.currenciesMap = res.symbols;
      }
    }));
  }

  /*
  The default base is `EUR` and I can't change it (in free plan) so please test it against `EUR` as base currency
   */
  swapCurrencies() {
    const baseValue = this.converterForm.get('base').value;

    this.converterForm.get('base').setValue(this.converterForm.get('to').value);
    this.converterForm.get('to').setValue(baseValue);
    this.getConversionRate();
  }

  /*
    I can't convert using convert Endpoint because it's needs paid subscription
    So I convert it locally
    */
  convert() {
    this.convertedAmount = (this.converterForm.get('amount').value * this.currentConversionRate) || 0;
    this.onConvert.emit(this.converterForm.get('amount').value)
  }

  getConversionRate() {
    const base = this.converterForm.get('base').value;
    const to = this.converterForm.get('to').value;
    this.currencyExchangeService.getRates<RateRes>(base, to).subscribe(res => {
      this.currentConversionRate = res.rates[to];
    });
  }
}

