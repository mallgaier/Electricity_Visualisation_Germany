import {Component, Input} from "@angular/core";
import * as Highcharts from 'highcharts';
import {Month, Year, Source} from '../service/enum.service';
import {CsvPriceScatterService} from "../service/csvPriceScatter.service";

@Component({
  selector: 'chart-big-price-export',
  templateUrl: './chart-big-price-export.component.html',
})
export class ChartBigPriceExportComponent {

  // Chart
  highchartBigPriceExport: typeof Highcharts = Highcharts;
  public updateFlagBigPriceExport = false;
  public chartRef!: Highcharts.Chart;
  public Source = Source;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvScatterService: CsvPriceScatterService) {
  }

  chartOptionsBigPriceExport: any = {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
    },
    xAxis: {
      title: {
        text: 'Electricity Export'
      },
      type: 'number',
      labels: {
        format: '{value} MWh'
      },
    },
    yAxis: {
      labels: {
        format: '{value} €',
      },
      title: {
        text: 'Price Difference'
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true
    },
    title: {
      text: '',
    },
    tooltip: {
      formatter: function (): string {
        // @ts-ignore
        if (this.x > 0) {
          // @ts-ignore
          return 'Export: <b>' + this.x + '</b> MWh <br/> Price Difference: <b>' + this.y + '</b> € <br/>'
        } else {
          // @ts-ignore
          return 'Import: <b>' + -this.x + '</b> MWh <br/> Price Difference: <b>' + this.y + '</b> € <br/>'
        }
      }
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 4.5,
          symbol: 'circle',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        }
      }
    },
    series: [{}]
  };

  updatedChart() {
    this.chartOptionsBigPriceExport.series[0] = {
      name: 'Export (0 - 3:45)',
      color: '#7570b3',
      data: this.csvScatterService.priceExport1,
    }
    this.chartOptionsBigPriceExport.series[1] = {
      color: '#1b9e77',
      name: 'Export (4 - 7:45)',
      data: this.csvScatterService.priceExport2,
    }
    this.chartOptionsBigPriceExport.series[2] = {
      name: 'Export (8 - 11:45)',
      color: '#66a61e',
      data: this.csvScatterService.priceExport3,
    }
    this.chartOptionsBigPriceExport.series[3] = {
      name: 'Export (12 - 15:45)',
      color: '#e6ab02',
      data: this.csvScatterService.priceExport4,
    }
    this.chartOptionsBigPriceExport.series[4] = {
      name: 'Export (16 - 19:45)',
      color: '#d95f02',
      data: this.csvScatterService.priceExport5,
    }
    this.chartOptionsBigPriceExport.series[5] = {
      name: 'Export (20 - 23:45)',
      color: '#e7298a',
      data: this.csvScatterService.priceExport5,
    }
    this.updateFlagBigPriceExport = true;
  }

}


