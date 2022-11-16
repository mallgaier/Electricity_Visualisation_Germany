import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ChartSmallDetailedComponent} from "./charts/chart-small-detailed.component";
import { ChartBigDetailedComponent } from './charts/chart-big-detailed.component';
import {ChartBigSummarizedComponent} from "./charts/chart-big-summarized.component";
import {ChartBigGroupedComponent} from "./charts/chart-big-grouped.component";
import {ChartSmallGroupedComponent} from "./charts/chart-small-grouped.component";
import {ChartSmallSummarizedComponent} from "./charts/chart-small-summarized.component";
import {DashboardComponent} from "./component/dashboard.component";
import {ComparisonComponent} from "./component/comparison.component";
import {ChartBigSecondDetailedComponent} from "./charts/chart-big-second-detailed.component";

@NgModule({
  declarations: [
    AppComponent,
    ChartBigDetailedComponent,
    ChartBigSummarizedComponent,
    ChartSmallDetailedComponent,
    ChartBigGroupedComponent,
    ChartSmallGroupedComponent,
    ChartSmallSummarizedComponent,
    DashboardComponent,
    ComparisonComponent,
    ChartBigSecondDetailedComponent
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
