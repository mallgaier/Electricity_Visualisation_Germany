import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {CsvService} from "./service/csv.service";
import {EnumService, Month, Year} from './service/enum.service';
import {faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {ChartService} from "./service/chart.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  // Select Options
  public Month = Month;
  public Year = Year;
  public displayMonth = Month.Year;
  public displayYear = Year.y2022;
  public displayDetail = true;
  public ;

  // Displayed values
  public percentageConventional = 0;
  public percentageRenewable = 0;
  public nextMonth: string | undefined;
  public previousMonth: string | undefined;

  // Icons
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;

  // Chart
  highchartBig: typeof Highcharts = Highcharts;
  public updateFlagBig = false;
  public chartRef!: Highcharts.Chart;


  constructor(private csvService: CsvService, public enumService: EnumService, public chartService: ChartService) {
  }

  ngOnInit(): void {
    this.csvService.initCSV('assets/testData.csv');
  }

  setDisplayMonth(value: Month) {
    return this.displayMonth = value;
  }

  setDisplayYear(value: Year) {
    return this.displayYear = value;
  }

  setDisplayDetail(detail: boolean) {
    this.displayDetail = detail;
  }

  calculatePercentageConventionalRenewable() {
    const sumConventional = this.csvService.sumConventional.reduce((partialSum, a) => partialSum + a, 0);
    const sumRenewable = this.csvService.sumRenewable.reduce((partialSum, a) => partialSum + a, 0);
    this.percentageConventional = Math.round(sumConventional / (sumRenewable + sumConventional) * 100);
    this.percentageRenewable = Math.round(sumRenewable / (sumRenewable + sumConventional) * 100);
  }

  calculateNextPreviousMonth() {
    this.previousMonth = this.enumService.getPreviousMonth(this.displayMonth, this.displayYear);
    this.nextMonth = this.enumService.getNextMonth(this.displayMonth, this.displayYear);
  }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  updateData(): void {
    this.csvService.initCSV(this.enumService.enumToFileName(this.displayMonth, this.displayYear));
  }

  updateGraph(): void {
    this.calculatePercentageConventionalRenewable();
    this.calculateNextPreviousMonth();

    if (this.displayDetail) {
      this.chartService.updateChartDetailed();
    } else {
      this.chartService.updateChartNondetailed();
  }
    this.updateFlagBig = true;
  }
}
