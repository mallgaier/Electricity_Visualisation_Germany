import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Detail} from '../service/enum.service';
import {ChartService} from "../service/chart.service";
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";

@Component({
  selector: 'chart-big',
  templateUrl: './chartBig.component.html',
})
export class ChartBigComponent implements OnInit {

  // Chart
  highchartBig: typeof Highcharts = Highcharts;
  public updateFlagBig = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public chartService: ChartService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updateSummarizedChart(this.enumService.toNumericMonth(this.displayMonth),2022);
    this.updateFlagBig = true;
  }

  chartOptionsBig: any = {
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
    this.chartOptionsBig.colors = [
      this.colourService.sumRenewables,
      this.colourService.sumConventional,
      this.colourService.totalDemand
    ]
    this.chartOptionsBig.plotOptions.series = {
      pointStart: Date.UTC(yearNumeric, monthNumeric - 1, 1),
      pointInterval: 15 * 60 * 1000,
    }
    this.chartOptionsBig.series[0] = {
      name: 'Sum Renewables',
      data: this.csvService.sumRenewable
    }
    this.chartOptionsBig.series[1] = {
      name: 'Sum Conventional',
      data: this.csvService.sumConventional
    }
    this.chartOptionsBig.series[2] = {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }

  /*  if (monthNumeric === 0) {
      this.chartOptionsBig.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptionsBig.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptionsBig.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptionsBig.plotOptions.series.pointInterval = 15 * 60 * 1000
    }*/
  }

}


