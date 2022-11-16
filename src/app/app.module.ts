import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ChartSmallDetailedComponent} from "./charts-small/chart-small-detailed.component";
import { ChartBigDetailedComponent } from './chart-big/chart-big-detailed.component';
import {ChartBigSummarizedComponent} from "./chart-big/chart-big-summarized.component";
import {ChartBigGroupedComponent} from "./chart-big/chart-big-grouped.component";
import {ChartSmallGroupedComponent} from "./charts-small/chart-small-grouped.component";
import {ChartSmallSummarizedComponent} from "./charts-small/chart-small-summarized.component";
import {DashboardComponent} from "./component/dashboard.component";
import {ComparisonComponent} from "./component/comparison.component";
import {ChartBigSecondDetailedComponent} from "./chart-big-second/chart-big-second-detailed.component";
import {ChartBigSecondGroupedComponent} from "./chart-big-second/chart-big-second-grouped.component";
import {ChartBigSecondSummarizedComponent} from "./chart-big-second/chart-big-second-summarized.component";
import {PriceGenerationComponent} from "./component/priceGeneration.component";
import {ChartBigPriceGenerationGroupedComponent} from "./chart-price/chart-big-price-generation-grouped.component";
import {ChartBigPriceExportComponent} from "./chart-price/chart-big-price-export.component";
import {PriceExportComponent} from "./component/priceExport.component";

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
    ChartBigSecondDetailedComponent,
    ChartBigSecondGroupedComponent,
    ChartBigSecondSummarizedComponent,
    PriceGenerationComponent,
    ChartBigPriceGenerationGroupedComponent,
    ChartBigPriceExportComponent,
    PriceExportComponent
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
