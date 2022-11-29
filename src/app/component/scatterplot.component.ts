import {Component, OnInit, ViewChild} from '@angular/core';
import {Detail, EnumService, Month, ScatterGrouping, Source, Year} from '../service/enum.service';
import {faArrowLeft, faArrowRight, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {CsvSecondService} from "../service/csvSecond.service";
import {ChartScatterplotComponent} from "../chart-price/chart-scatterplot.component";
import {CsvScatterService} from "../service/csvScatter.service";


@Component({
  selector: 'scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['../app.component.css'],
})
export class ScatterplotComponent implements OnInit {

  // Select Options
  public Month = Month;
  public Year = Year;
  public Detail = Detail;
  public ScatterGrouping = ScatterGrouping;
  public Source = Source;
  public displayMonth = Month.Year;
  public displayYear = Year.y2022;
  public scatterGrouping = ScatterGrouping.season;
  public dataResolution = ScatterGrouping.weekly;
  public scatterXAxis = Source.cw;
  public scatterYAxis = Source.photovoltaics;

  public displayDetailFirst = Detail.detailed;
  public meritOrder = true;
  public nextMonth: string | undefined;
  public previousMonth: string | undefined;

  //Icons
  public faCircleInfo = faCircleInfo;
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;

  public isUpdatingFirst = false;

  @ViewChild(ChartScatterplotComponent) chartScatterplotComponent!: ChartScatterplotComponent;


  constructor(public csvScatterService: CsvScatterService, public csvSecondService: CsvSecondService, public enumService: EnumService) {
  }

  ngOnInit(): void {
    this.updateVisualization();
  }

  async updateVisualization(): Promise<void> {
    this.isUpdatingFirst = true;
    await this.csvScatterService.updateCSVAndMatrix(this.scatterGrouping, this.displayYear, this.dataResolution, this.scatterXAxis, this.scatterYAxis);
    setTimeout(() => {
      this.chartScatterplotComponent.updatedChart(this.scatterXAxis, this.scatterYAxis);
      this.isUpdatingFirst = false;
    }, 1000);
    this.calculateNextPreviousMonth();

    const displayFirst = this.displayDetailFirst;
    this.displayDetailFirst = Detail.loading;
    setTimeout(() => {
      this.displayDetailFirst = displayFirst;
    }, 100);
  }

  updateFirstDiagram(): void {
    this.updateVisualization();
  }

  setDisplayMonth(value: Month) {
    return this.displayMonth = value;
  }

  setDisplayYear(value: Year) {
    return this.displayYear = value;
  }

  setScatterGrouping(value: ScatterGrouping) {
    this.scatterGrouping = value;
    if (this.scatterGrouping === ScatterGrouping.year) {
      this.displayYear = Year.yAll;
    }
  }

  setDataResolution(value: ScatterGrouping) {
    this.dataResolution = value;
    if (this.dataResolution === ScatterGrouping.daily && this.displayYear === Year.yAll) {
      this.displayYear = Year.y2022;
    }
  }

  setScatterXAxis(value: Source) {
    return this.scatterXAxis = value;
  }

  setScatterYAxis(value: Source) {
    return this.scatterYAxis = value;
  }

  changeBigDetail(detail: Detail) {
    this.displayDetailFirst = detail;
  }

  changeInfo(info: boolean) {
    this.meritOrder = info;
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
}
