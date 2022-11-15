import {Component, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {CsvService} from "./service/csv.service";
import {Detail, EnumService, Month, Year} from './service/enum.service';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {ChartSmallDetailedComponent} from "./component/chart-small-detailed.component";
import {ChartBigDetailedComponent} from "./component/chart-big-detailed.component";
import {ChartBigGroupedComponent} from "./component/chart-big-grouped.component";
import {ChartBigSummarizedComponent} from "./component/chart-big-summarized.component";
import {ChartSmallGroupedComponent} from "./component/chart-small-grouped.component";
import {ChartSmallSummarizedComponent} from "./component/chart-small-summarized.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  // Select Options
  public Month = Month;
  public Year = Year;
  public Detail = Detail;
  public displayMonth = Month.Aug;
  public displayYear = Year.y2022;
  public displayDetailBig = Detail.detailed;
  public displayDetailSmall = Detail.detailed;
  public collapseSecondRow = false;

  // Displayed values
  public percentageConventional = 0;
  public percentageRenewable = 0;
  public nextMonth: string | undefined;
  public previousMonth: string | undefined;
  public titleBig: string | undefined;
  public titleSmall: string | undefined;
  public subtitleBig: string | undefined;
  public isUpdating = false;
  public version = 'v 0.1.1';

  // Icons
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;
  public faArrowDown = faArrowDown;
  public faArrowUp = faArrowUp;

  // Chart
  highchartBig: typeof Highcharts = Highcharts;
  public updateFlagBig = false;
  public chartRef!: Highcharts.Chart;

  @ViewChild(ChartBigDetailedComponent) chartBigDetailedComponent!: ChartBigDetailedComponent;
  @ViewChild(ChartBigGroupedComponent) chartBigGroupedComponent!: ChartBigGroupedComponent;
  @ViewChild(ChartBigSummarizedComponent) chartBigSummarizedComponent!: ChartBigSummarizedComponent;

  @ViewChild(ChartSmallDetailedComponent) chartSmallDetailedComponent!: ChartSmallDetailedComponent;
  @ViewChild(ChartSmallGroupedComponent) chartSmallGroupedComponent!: ChartSmallGroupedComponent;
  @ViewChild(ChartSmallSummarizedComponent) chartSmallSummarizedComponent!: ChartSmallSummarizedComponent;


  constructor(public csvService: CsvService, public enumService: EnumService) {
  }

  ngOnInit(): void {
    this.updateVisualization();
  }

  async updateVisualization(): Promise<void> {
    this.isUpdating = true;
    await this.csvService.updateCSVAndAggregatedValues(this.enumService.enumToFileName(this.displayMonth, this.displayYear));
    setTimeout(() => {
      this.updateGraph();
      this.isUpdating = false;
    }, 1000);
    const displayBig = this.displayDetailBig;
    const displaySmall = this.displayDetailSmall;
    this.displayDetailBig = Detail.loading;
    this.displayDetailSmall = Detail.loading;
    setTimeout(() => {
      this.displayDetailBig = displayBig;
      this.displayDetailSmall = displaySmall;
    }, 100);
  }

  updateGraph(): void {
    this.calculatePercentageConventionalRenewable();
    this.calculateNextPreviousMonth();
    this.updateDiagrams();
  }

  updateDiagrams(): void {
    switch (this.displayDetailBig) {
      case Detail.detailed:
        this.chartBigDetailedComponent.updateDetailedChart(this.enumService.toNumericMonth(this.displayMonth), Number(this.displayYear.toString()));
        break;
      case Detail.grouped:
        this.chartBigGroupedComponent.updateGroupedChart(this.enumService.toNumericMonth(this.displayMonth), Number(this.displayYear.toString()));
        break;
      case Detail.summarized:
        this.chartBigSummarizedComponent.updateSummarizedChart(this.enumService.toNumericMonth(this.displayMonth), Number(this.displayYear.toString()));
        break;
    }
    switch (this.displayDetailSmall) {
      case Detail.detailed:
        this.chartSmallDetailedComponent.updateSmallDetailedChart();
        break;
      case Detail.grouped:
        this.chartSmallGroupedComponent.updateSmallGroupedChart();
        break;
      case Detail.summarized:
        this.chartSmallSummarizedComponent.updateSmallSummarizedChart();
        break;
    }
  }

  calculatePercentageConventionalRenewable() {
    const sumConventional = this.csvService.sumConventional.reduce((partialSum, a) => partialSum + a, 0);
    const sumRenewable = this.csvService.sumRenewable.reduce((partialSum, a) => partialSum + a, 0);
    this.percentageConventional = Math.round(sumConventional / (sumRenewable + sumConventional) * 100);
  }

  calculateNextPreviousMonth() {
    if (this.displayMonth === Month.Year) {
      this.previousMonth = this.enumService.getPreviousYear(this.displayYear);
      this.nextMonth = this.enumService.getNextYear(this.displayYear);
    } else {
      this.previousMonth = this.enumService.getPreviousMonthAsString(this.displayMonth, this.displayYear);
      this.nextMonth = this.enumService.getNextMonthAsString(this.displayMonth, this.displayYear);
    }
  }

  tilePreviousMonth() {
    let previous = this.enumService.getPreviousMonthAsEnum(this.displayMonth, this.displayYear);
    this.displayMonth = previous[0];
    this.displayYear = previous[1];
    this.updateVisualization();
  }

  tileNextMonth() {
    let next = this.enumService.getNextMonthAsEnum(this.displayMonth, this.displayYear);
    this.displayMonth = next[0];
    this.displayYear = next[1];
    this.updateVisualization();
  }


  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  setDisplayMonth(value: Month) {
    return this.displayMonth = value;
  }

  setDisplayYear(value: Year) {
    return this.displayYear = value;
  }

  setDisplayDetail(value: Detail) {
    return this.displayDetailBig = value;
  }

  changeCollapseSecondRow() {
    this.collapseSecondRow = !this.collapseSecondRow;
    this.updateFlagBig = true;
  }

  changeBigDetail(detail: Detail) {
    this.displayDetailBig = detail;
  }

  changeSmallDetail(detail: Detail) {
    this.displayDetailSmall = detail;
  }
}
