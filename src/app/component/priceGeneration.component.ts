import {Component, OnInit, ViewChild} from '@angular/core';
import {CsvService} from "../service/csv.service";
import {Detail, EnumService, Month, Year} from '../service/enum.service';
import {faArrowLeft, faArrowRight, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {CsvSecondService} from "../service/csvSecond.service";
import {ChartBigPriceGenerationGroupedComponent} from "../chart-price/chart-big-price-generation-grouped.component";


@Component({
  selector: 'priceGeneration',
  templateUrl: './priceGeneration.component.html',
  // styleUrls: ['./comparison.component.css'],
})
export class PriceGenerationComponent implements OnInit {

  // Select Options
  public Month = Month;
  public Year = Year;
  public Detail = Detail;
  public displayMonth = Month.Aug;
  public displayYear = Year.y2022;
  public displayDetailFirst = Detail.detailed;
  public meritOrder = true;
  public nextMonth: string | undefined;
  public previousMonth: string | undefined;

  //Icons
  public faCircleInfo = faCircleInfo;
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;

  public isUpdatingFirst = false;

  @ViewChild(ChartBigPriceGenerationGroupedComponent) chartBigPriceGenerationGroupedComponent!: ChartBigPriceGenerationGroupedComponent;


  constructor(public csvService: CsvService, public csvSecondService: CsvSecondService, public enumService: EnumService) {
  }

  ngOnInit(): void {
    this.updateVisualization();
  }

  async updateVisualization(): Promise<void> {
    this.isUpdatingFirst = true;
    await this.csvService.updateCSVAndAggregatedValues(this.enumService.enumToFileName(this.displayMonth, this.displayYear));
    setTimeout(() => {
      this.chartBigPriceGenerationGroupedComponent.updateGroupedChart(this.enumService.toNumericMonth(this.displayMonth), Number(this.displayYear.toString()));
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
