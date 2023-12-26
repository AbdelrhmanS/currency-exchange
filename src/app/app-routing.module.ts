import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ConverterPanelComponent} from "./converter-panel/converter-panel.component";

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [],
}, {
  path: 'converter/:baseCurrency/:targetCurrency',
  component: ConverterPanelComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*

  Header component
  - Left logo
  - Details links on right

  Converter sticky panel component
  - Amount (Number, Required)
  - From/ TO (All available currencies as dropdown)
  - Button to swap between from/to dropdowns
  - Button to redirect to details page
  - Converted Results label


  Details Page:
  - Full name of From currency
  - Back button
  - Converter panel with converted amount and from dropdown is disabled
  - Chart for history of selected currencies
  Most popular currencies


 */
