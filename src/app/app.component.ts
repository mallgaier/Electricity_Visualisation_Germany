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

  // Displayed values
  public percentageConventional = 0;
  public percentageRenewable = 0;
  public nextMonth: string | undefined;
  public previousMonth: string | undefined;
  public titleBig: string | undefined;
  public subtitleBig: string | undefined;

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
    this.titleBig = 'Electricity Production per Source';
  }

  updateData(): void {
    this.csvService.initCSV(this.enumService.enumToFileName(this.displayMonth, this.displayYear));
  }

  updateGraph(): void {
    this.calculatePercentageConventionalRenewable();
    this.calculateNextPreviousMonth();
    this.updateTitles(this.displayYear, this.displayMonth);

    if (this.displayDetail) {
      this.chartService.updateDetailedChart();
    } else {
      this.chartService.updateSummarizedChart();
    }
    this.updateFlagBig = true;
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

  updateTitles(year: Year, month: Month) {
    if (this.displayDetail) {
      this.titleBig = 'Electricity Production per Source in ' + (month === Month.Year ? '' : month + ' ') + year;
    } else {
      this.titleBig = 'Summarized Electricity Production in ' + (month === Month.Year ? '' : month + ' ') + year;
    }
    if (month === Month.Year) {
      this.subtitleBig = 'The data shown was averaged over a 6-hour period'
    } else {
      this.subtitleBig = 'The data shown was recorded at 15min intervals';
    }
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

  setDisplayDetail(detail: boolean) {
    this.displayDetail = detail;
  }
}
