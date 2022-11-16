import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {ColourService} from "../service/colour.service";
import {CsvSecondService} from "../service/csvSecond.service";

@Component({
  selector: 'chart-big-second-summarized',
  templateUrl: './chart-big-second-summarized.component.html',
})
export class ChartBigSecondSummarizedComponent implements OnInit {

  // Chart
  highchartBigSecondSummarized: typeof Highcharts = Highcharts;
  public updateFlagBigSecondSummarized = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvSecondService: CsvSecondService, public enumService: EnumService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updateSummarizedChart(this.enumService.toNumericMonth(this.displayMonth),this.displayYear);
  }

  chartOptionsBigSecondSummarized: any = {
    chart: {
      type: 'area',
      zoomType: 'x',
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'MWh'
      },
    },
    legend: {enabled: false},
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
      data: this.csvSecondService.sumRenewable
    }, {
      name: 'Sum Conventional',
      data: this.csvSecondService.sumConventional
    }, {
      name: 'total Grid load',
      type: 'line',
      data: this.csvSecondService.totalGridLoad
    }]
  };

  updateSummarizedChart(monthNumeric: number, yearNumeric: number) {
    this.chartOptionsBigSecondSummarized.colors = [
      this.colourService.sumRenewables,
      this.colourService.sumConventional,
      this.colourService.totalGridLoad
    ]
    this.chartOptionsBigSecondSummarized.plotOptions.series = {
      pointStart: Date.UTC(yearNumeric, monthNumeric - 1, 1),
      pointInterval: 15 * 60 * 1000,
    }
    this.chartOptionsBigSecondSummarized.series[0] = {
      name: 'Sum Renewables',
      data: this.csvSecondService.sumRenewable
    }
    this.chartOptionsBigSecondSummarized.series[1] = {
      name: 'Sum Conventional',
      data: this.csvSecondService.sumConventional
    }
    this.chartOptionsBigSecondSummarized.series[2] = {
      name: 'total Grid load',
      type: 'line',
      data: this.csvSecondService.totalGridLoad
    }

    this.updateFlagBigSecondSummarized = true;
  }

}


