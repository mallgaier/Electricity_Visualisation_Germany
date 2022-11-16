import {Component, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {CsvService} from "../service/csv.service";
import {Detail, EnumService, Month, Year} from '../service/enum.service';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {ChartSmallDetailedComponent} from "../charts-small/chart-small-detailed.component";
import {ChartBigDetailedComponent} from "../chart-big/chart-big-detailed.component";
import {ChartBigGroupedComponent} from "../chart-big/chart-big-grouped.component";
import {ChartBigSummarizedComponent} from "../chart-big/chart-big-summarized.component";
import {ChartSmallGroupedComponent} from "../charts-small/chart-small-grouped.component";
import {ChartSmallSummarizedComponent} from "../charts-small/chart-small-summarized.component";
import {ChartBigSecondDetailedComponent} from "../chart-big-second/chart-big-second-detailed.component";
import {CsvSecondService} from "../service/csvSecond.service";


@Component({
  selector: 'comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent implements OnInit {

  // Select Options
  public Month = Month;
  public Year = Year;
  public Detail = Detail;
  public displayMonth = Month.Aug;
  public displayYear = Year.y2022;
  public displayMonth2 = Month.Feb;
  public displayYear2 = Year.y2022;
  public displayDetailBig = Detail.detailed;

  public isUpdatingFirst = false;
  public isUpdatingSecond = false;

  @ViewChild(ChartBigDetailedComponent) chartBigDetailedComponent!: ChartBigDetailedComponent;
  @ViewChild(ChartBigGroupedComponent) chartBigGroupedComponent!: ChartBigGroupedComponent;
  @ViewChild(ChartBigSummarizedComponent) chartBigSummarizedComponent!: ChartBigSummarizedComponent;

  @ViewChild(ChartBigSecondDetailedComponent) chartBigSecondDetailedComponent!: ChartBigSecondDetailedComponent;


  constructor(public csvService: CsvService, public csvSecondService: CsvSecondService, public enumService: EnumService) {
  }

  ngOnInit(): void {
    this.updateVisualization(true, true);
  }

  async updateVisualization(first: boolean, second: boolean): Promise<void> {
    if (first) {
      this.isUpdatingFirst = true;
      await this.csvService.updateCSVAndAggregatedValues(this.enumService.enumToFileName(this.displayMonth, this.displayYear));
    }
    if (second) {
      this.isUpdatingSecond = true;
      await this.csvSecondService.updateCSVAndAggregatedValues(this.enumService.enumToFileName(this.displayMonth2, this.displayYear2));
    }
    setTimeout(() => {
        if (first) {
          this.updateDiagram1();
        }
        if (second) {
          this.updateDiagram2();
        }
        this.isUpdatingFirst = false;
        this.isUpdatingSecond  = false;
      }
      , 1000);
  }

  updateFirstDiagram(): void {
    this.updateVisualization(true, false);
  }

  updateSecondDiagram(): void {
    this.updateVisualization(false, true);
  }

  updateDiagram1(): void {
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
  }

  updateDiagram2(): void {
    switch (this.displayDetailBig) {
      case Detail.detailed:
        this.chartBigSecondDetailedComponent.updateDetailedChart(this.enumService.toNumericMonth(this.displayMonth), Number(this.displayYear.toString()));
        break;
      case Detail.grouped:
        this.chartBigGroupedComponent.updateGroupedChart(this.enumService.toNumericMonth(this.displayMonth), Number(this.displayYear.toString()));
        break;
      case Detail.summarized:
        this.chartBigSummarizedComponent.updateSummarizedChart(this.enumService.toNumericMonth(this.displayMonth), Number(this.displayYear.toString()));
        break;
    }
  }

  setDisplayMonth(value: Month) {
    return this.displayMonth = value;
  }

  setDisplayYear(value: Year) {
    return this.displayYear = value;
  }

  setDisplayMonth2(value: Month) {
    return this.displayMonth = value;
  }

  setDisplayYear2(value: Year) {
    return this.displayYear = value;
  }

  setDisplayDetail(value: Detail) {
    return this.displayDetailBig = value;
  }

  changeBigDetail(detail: Detail) {
    this.displayDetailBig = detail;
  }
}
