import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";

@Component({
  selector: 'chart-big-price-export',
  templateUrl: './chart-big-price-export.component.html',
})
export class ChartBigPriceExportComponent implements OnInit {

  // Chart
  highchartBigPriceExport: typeof Highcharts = Highcharts;
  public updateFlagBigPriceExport = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updatedChart(this.enumService.toNumericMonth(this.displayMonth),this.displayYear);
  }

  chartOptionsBigPriceExport: any = {
    chart: {
      type: 'area',
      zoomType: 'x',
      alignThresholds: true
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime',
    },
    yAxis: [{
      labels: {
        format: '{value}',
      },
      title: {
        text: 'Net Export (in MWh)'
      }
    }, {
      lineWidth: 1,
      opposite: true,
      labels: {
        format: '{value}€',
      },
      title: {
        text: 'Day-Ahead Price'
      }
    }],
    title: {
      text: '',
    },
    tooltip: {
      shared: true,
      headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>',
      xDateFormat: '%A %d.%m.%Y %k:%M'
    },
    plotOptions: {
      series: {
      },
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
    series: [{}]
  };

  updatedChart(monthNumeric: number, yearNumeric: number) {
    if (monthNumeric === 0) {
      this.chartOptionsBigPriceExport.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptionsBigPriceExport.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptionsBigPriceExport.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptionsBigPriceExport.plotOptions.series.pointInterval = 15 * 60 * 1000
    }

    this.chartOptionsBigPriceExport.series[0] = {
      name: 'Net Export',
      type: 'line',
      yAxis: 0,
      threshold: 0,
      color: this.colourService.netExport,
      data: this.csvService.netExport,
    }
    this.chartOptionsBigPriceExport.series[1] = {
      name: 'day-Ahead Price in Germany',
      type: 'line',
      yAxis: 1,
      threshold: 0,
      color: this.colourService.dayAheadPrice,
      data: this.csvService.dayAheadPrice
    }
    this.chartOptionsBigPriceExport.series[2] = {
      name: 'day-Ahead Price in Neighboring Countries',
      type: 'line',
      yAxis: 1,
      threshold: 0,
      color: this.colourService.dayAheadNeighbourPrice,
      data: this.csvService.dayAheadNeighbourPrice
    }
      this.chartOptionsBigPriceExport.series[3] = {
        name: 'Difference in Day-Ahead Price',
        type: 'line',
        yAxis: 1,
        threshold: 0,
        color: this.colourService.dayAheadNeighbourPrice,
        data: this.csvService.deltaPrice
      }

    this.updateFlagBigPriceExport = true;
  }

}


