import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Source, Year} from '../service/enum.service';
import {ColourService} from "../service/colour.service";
import {CsvHeatmapService} from "../service/csvHeatmap.service";
import {CsvService} from "../service/csv.service";
import HC_map from 'highcharts/modules/map';

HC_map(Highcharts);

@Component({
  selector: 'chart-source-heatmap',
  templateUrl: './chart-source-heatmap.component.html',
})
export class ChartSourceHeatmapComponent implements OnInit {

  // Chart
  highchartSourceHeatmap: typeof Highcharts = Highcharts;
  public updateFlagSourceHeatmap = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;
  @Input() public source = Source as any;

  constructor(private csvHeatmapService: CsvHeatmapService, public enumService: EnumService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updatedChart(this.enumService.toNumericMonth(this.displayMonth), this.displayYear, this.source);
  }

  chartOptionsSourceHeatmap: any = {
    chart: {
      type: 'heatmap',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        hour: '%I %p',
        minute: '%I:%M %p'
      }
    },
    yAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      reversed: true,
      title: '',
    },
    title: {
      text: '',
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 500
    },
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      startOnTick: true,
      endOnTick: true,
      labels: {
        format: '{value}%'
      }
    },
    series: [{
      data: this.csvHeatmapService.heatmap,
      borderWidth: 1,
      dataLabels: {
        enabled: false,
      }
    }]
  };

  updatedChart(monthNumeric: number, yearNumeric: number, colour: Source) {
    /*  if (monthNumeric === 0) {
        this.chartOptionsSourceHeatmap.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
        this.chartOptionsSourceHeatmap.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
      } else {
        this.chartOptionsSourceHeatmap.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
        this.chartOptionsSourceHeatmap.plotOptions.series.pointInterval = 15 * 60 * 1000
      }*/
    this.chartOptionsSourceHeatmap.series[0].data = this.csvHeatmapService.heatmap;
    this.chartOptionsSourceHeatmap.colorAxis.maxColor = this.colourService.sourceToColour(colour);
  }

}


