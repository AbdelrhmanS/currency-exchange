import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgxEchartsModule} from 'ngx-echarts';
import {RouterModule} from '@angular/router';

import * as echarts from 'echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ConverterPanelComponent } from './converter-panel/converter-panel.component';
import {CurrencyExchangeService} from './currency-exchange.service';
import { CurrenciesHistoryComponent } from './currencies-history/currencies-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ConverterPanelComponent,
    CurrenciesHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({ echarts }),
  ],
  providers: [
    CurrencyExchangeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
