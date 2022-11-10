import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ChartSmallDetailedComponent} from "./component/chart-small-detailed.component";
import { ChartBigDetailedComponent } from './component/chart-big-detailed.component';
import {ChartBigSummarizedComponent} from "./component/chart-big-summarized.component";
import {ChartBigGroupedComponent} from "./component/chart-big-grouped.component";

@NgModule({
  declarations: [
    AppComponent,
    ChartBigDetailedComponent,
    ChartBigSummarizedComponent,
    ChartSmallDetailedComponent,
    ChartBigGroupedComponent
  ],
  imports: [
    BrowserModule,
    HighchartsChartModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
