import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {CsvService} from "./service/csv.service";
import {EnumService, Month, Year} from './service/enum.service';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from '@fortawesome/free-solid-svg-icons';
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
  public displayMonth = Month.Aug;
  public displayYear = Year.y2022;
  public displayDetail = true;
  public collapseSecondRow = false;

  // Displayed values
  public percentageConventional = 0;
  public percentageRenewable = 0;
  public nextMonth: string | undefined;
  public previousMonth: string | undefined;
  public titleBig: string | undefined;
  public subtitleBig: string | undefined;
  public isUpdating = false;

  // Icons
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;
  public faArrowDown = faArrowDown;
  public faArrowUp = faArrowUp;

  // Chart
  highchartBig: typeof Highcharts = Highcharts;
  public updateFlagBig = false;
  public chartRef!: Highcharts.Chart;


  constructor(private csvService: CsvService, public enumService: EnumService, public chartService: ChartService) {
  }

  ngOnInit(): void {
    this.updateVisualization();
  }

  async updateVisualization(): Promise<void> {
    this.isUpdating = true;
    const update = await this.csvService.initCSV(this.enumService.enumToFileName(this.displayMonth, this.displayYear));
    setTimeout(() => {
      this.updateGraph();
      this.isUpdating = false;
    }, 1000);
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
    if (this.displayMonth === Month.Year) {
      this.previousMonth = this.enumService.getPreviousYear(this.displayYear);
      this.nextMonth = this.enumService.getNextYear(this.displayYear);
    } else {
      this.previousMonth = this.enumService.getPreviousMonthAsString(this.displayMonth, this.displayYear);
      this.nextMonth = this.enumService.getNextMonthAsString(this.displayMonth, this.displayYear);
    }
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

  setDisplayDetail(detail: boolean) {
    this.displayDetail = detail;
  }

  changeCollapseSecondRow() {
    this.collapseSecondRow = !this.collapseSecondRow;
    this.updateFlagBig = true;
  }
}
