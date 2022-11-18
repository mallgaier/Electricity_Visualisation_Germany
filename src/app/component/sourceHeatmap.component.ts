import {Component, OnInit, ViewChild} from '@angular/core';
import {Detail, EnumService, Month, Source, Year} from '../service/enum.service';
import {faArrowLeft, faArrowRight, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {ChartSourceHeatmapComponent} from "../chart-price/chart-source-heatmap.component";
import {CsvHeatmapService} from "../service/csvHeatmap.service";


@Component({
  selector: 'sourceHeatmap',
  templateUrl: './sourceHeatmap.component.html',
  // styleUrls: ['./comparison.component.css'],
})
export class SourceHeatmapComponent implements OnInit {

  // Select Options
  public Month = Month;
  public Year = Year;
  public Detail = Detail;
  public Source = Source;
  public displayMonth = Month.Aug;
  public displayYear = Year.y2022;
  public displaySource = Source.hydroPumpedStorage;
  public displayDetailFirst = Detail.detailed;
  public nextMonth: string | undefined;
  public previousMonth: string | undefined;

  //Icons
  public faCircleInfo = faCircleInfo;
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;

  public isUpdatingFirst = false;

  @ViewChild(ChartSourceHeatmapComponent) chartSourceHeatmapComponent!: ChartSourceHeatmapComponent;


  constructor(public csvHeatmapService: CsvHeatmapService, public enumService: EnumService) {
  }

  ngOnInit(): void {
    this.updateVisualization();
  }

  async updateVisualization(): Promise<void> {
    this.isUpdatingFirst = true;
    await this.csvHeatmapService.updateCSVAndAggregatedValues(this.enumService.enumToFileName(this.displayMonth, this.displayYear), this.displaySource);

    setTimeout(() => {
      this.chartSourceHeatmapComponent.updatedChart(this.displaySource);
      this.isUpdatingFirst = false;
    }, 1500);
    this.calculateNextPreviousMonth();

    const displayFirst = this.displayDetailFirst;
    this.displayDetailFirst = Detail.loading;
    setTimeout(() => {
      this.displayDetailFirst = displayFirst;
    }, 300);
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

  setDisplaySource(value: Source) {
    return this.displaySource = value;
  }


  changeBigDetail(detail: Detail) {
    this.displayDetailFirst = detail;
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
