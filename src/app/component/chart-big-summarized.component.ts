import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Detail} from '../service/enum.service';
import {ChartService} from "../service/chart.service";
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";

@Component({
  selector: 'chart-big-summarized',
  templateUrl: './chart-big-summarized.component.html',
})
export class ChartBigSummarizedComponent implements OnInit {

  // Chart
  highchartBigSummarized: typeof Highcharts = Highcharts;
  public updateFlagBigSummarized = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public chartService: ChartService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updateSummarizedChart(this.enumService.toNumericMonth(this.displayMonth),2022);
  }

  chartOptionsBigSummarized: any = {
    chart: {
      type: 'area',
      zoomType: 'x',
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime',
      // timezone: 'Europe/Berlin',
      // dateTimeLabelFormats: '%A %d.%m.%Y %k:%M',
    },
    yAxis: {
      title: {
        text: 'MWh'
      },
    },
    title: {
      text: '',
    },
    tooltip: {
      shared: true,
      headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>',
      xDateFormat: '%A %d.%m.%Y %k:%M'
    },
    plotOptions: {
      series: {},
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,

        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    },
    series: [{
      name: 'Sum Renewables',
      data: this.csvService.sumRenewable
    }, {
      name: 'Sum Conventional',
      data: this.csvService.sumConventional
    }, {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }]
  };

  updateSummarizedChart(monthNumeric: number, yearNumeric: number) {
    this.chartOptionsBigSummarized.colors = [
      this.colourService.sumRenewables,
      this.colourService.sumConventional,
      this.colourService.totalDemand
    ]
    this.chartOptionsBigSummarized.plotOptions.series = {
      pointStart: Date.UTC(yearNumeric, monthNumeric - 1, 1),
      pointInterval: 15 * 60 * 1000,
    }
    this.chartOptionsBigSummarized.series[0] = {
      name: 'Sum Renewables',
      data: this.csvService.sumRenewable
    }
    this.chartOptionsBigSummarized.series[1] = {
      name: 'Sum Conventional',
      data: this.csvService.sumConventional
    }
    this.chartOptionsBigSummarized.series[2] = {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }

    this.updateFlagBigSummarized = true;
  }

}


