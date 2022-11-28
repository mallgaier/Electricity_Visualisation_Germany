import {Component, OnInit, ViewChild} from '@angular/core';
import {CsvService} from "../service/csv.service";
import {Detail, EnumService, Month, Year} from '../service/enum.service';
import {ChartBigDetailedComponent} from "../chart-big/chart-big-detailed.component";
import {ChartBigGroupedComponent} from "../chart-big/chart-big-grouped.component";
import {ChartBigSummarizedComponent} from "../chart-big/chart-big-summarized.component";
import {ChartBigSecondDetailedComponent} from "../chart-big-second/chart-big-second-detailed.component";
import {CsvSecondService} from "../service/csvSecond.service";
import {ChartBigSecondGroupedComponent } from '../chart-big-second/chart-big-second-grouped.component';
import {ChartBigSecondSummarizedComponent} from "../chart-big-second/chart-big-second-summarized.component";


@Component({
  selector: 'comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['../app.component.css', './comparison.component.css'],
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
  public displayDetailFirst = Detail.detailed;
  public displayDetailSecond = Detail.detailed;

  public isUpdatingFirst = false;
  public isUpdatingSecond = false;

  @ViewChild(ChartBigDetailedComponent) chartBigDetailedComponent!: ChartBigDetailedComponent;
  @ViewChild(ChartBigGroupedComponent) chartBigGroupedComponent!: ChartBigGroupedComponent;
  @ViewChild(ChartBigSummarizedComponent) chartBigSummarizedComponent!: ChartBigSummarizedComponent;

  @ViewChild(ChartBigSecondDetailedComponent) chartBigSecondDetailedComponent!: ChartBigSecondDetailedComponent;
  @ViewChild(ChartBigSecondGroupedComponent) chartBigSecondGroupedComponent!: ChartBigSecondGroupedComponent;
  @ViewChild(ChartBigSecondDetailedComponent) chartBigSecondSummarizedComponent!: ChartBigSecondSummarizedComponent;


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
      this.updateDiagram1();
      this.updateDiagram2();
      this.isUpdatingFirst = false;
      this.isUpdatingSecond = false;
    }, 1000);

    const displayFirst = this.displayDetailFirst;
    const displaySecond = this.displayDetailSecond;
    if (first) {
      this.displayDetailFirst = Detail.loading;
    }
    if (second) {
      this.displayDetailSecond = Detail.loading;
    }
    setTimeout(() => {
      this.displayDetailFirst = displayFirst;
      this.displayDetailSecond = displaySecond;
    }, 100);
  }

  updateFirstDiagram(): void {
    this.updateVisualization(true, false);
  }

  updateSecondDiagram(): void {
    this.updateVisualization(false, true);
  }

  updateDiagram1(): void {
    switch (this.displayDetailFirst) {
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
    switch (this.displayDetailFirst) {
      case Detail.detailed:
        this.chartBigSecondDetailedComponent.updateDetailedChart(this.enumService.toNumericMonth(this.displayMonth2), Number(this.displayYear.toString()));
        break;
      case Detail.grouped:
        this.chartBigSecondGroupedComponent.updateGroupedChart(this.enumService.toNumericMonth(this.displayMonth2), Number(this.displayYear.toString()));
        break;
      case Detail.summarized:
        this.chartBigSecondSummarizedComponent.updateSummarizedChart(this.enumService.toNumericMonth(this.displayMonth2), Number(this.displayYear.toString()));
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
    return this.displayMonth2 = value;
  }

  setDisplayYear2(value: Year) {
    return this.displayYear2 = value;
  }

  changeBigDetail(detail: Detail) {
    this.displayDetailFirst = detail;
    this.displayDetailSecond = detail;
  }
}
