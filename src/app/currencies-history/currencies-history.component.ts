import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CurrencyExchangeService} from "../currency-exchange.service";
import {forkJoin} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-currencies-history',
  templateUrl: './currencies-history.component.html',
  styleUrls: ['./currencies-history.component.scss']
})
export class CurrenciesHistoryComponent implements OnInit, OnChanges {

  @Input('base') base: string;
  @Input('to') to: string;
  chartOption: any;

  seriesDates: string[] = [];
  convertedSeries: number[] = [];

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
  ) { }

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    const currentDate = new Date();
    const lastYearDate = new Date();
    lastYearDate.setFullYear(currentDate.getFullYear() - 1);

    const dates = this.getMonthsBetweenTwoDates(currentDate, lastYearDate);

    this.getHistoricalData(this.base, this.to).subscribe(() => {
      this.chartOption = {
        xAxis: {
          type: 'category',
          data: dates,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.convertedSeries,
            type: 'line',
            label: {
              show: true,
            },
          }
        ],
      };
    });
  }

  getHistoricalData(base: string, to: string) {
    return forkJoin(this.seriesDates.map(date => this.currencyExchangeService
      .getHistoricalDate(this.base, this.to, date)))
      .pipe(map((res: any) => {
          this.convertedSeries = res.map(rate => rate.rates[to]);
      }));
  }

  getHistoricalSeries(base: string, to: string, startDate: string, endDate: string) {
    this.currencyExchangeService.getHistoricalData(base, to, startDate, endDate).subscribe(res => {
      console.log('historical', res);
    })
  }

  getMonthsBetweenTwoDates(lastYearDate: Date, currentDate: Date) {
    const dates = [];
    while (currentDate <= lastYearDate) {
      const currentDateStr = currentDate.toISOString().split('T')[0];
      this.seriesDates.push(currentDateStr);
      dates.push(currentDateStr.substr(0, currentDateStr.lastIndexOf('-')));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return dates;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.to && changes.to.currentValue) {
      this.initChart();
    }
  }
}
