import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";
import {CsvScatterService} from "../service/csvScatter.service";

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

  constructor(private csvScatterService: CsvScatterService, public enumService: EnumService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updatedChart(this.enumService.toNumericMonth(this.displayMonth),this.displayYear);
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
    legend: {enabled: false},
    tooltip: {
      formatter: function(): string {
        // @ts-ignore
        if (this.x > 0) {
          // @ts-ignore
          return 'Export: <b>' + this.x +'</b> MWh <br/> Price Difference: <b>'+ this.y + '</b> € <br/>'
        } else {
          // @ts-ignore
          return 'Import: <b>' + -this.x + '</b> MWh <br/> Price Difference: <b>' + this.y + '</b> € <br/>'
        }
      }
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 2.5,
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
    series: [{
      name: 'Net Export',
      data: this.csvScatterService.priceExport,
    }]
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
      data: this.csvScatterService.priceExport,
    }
    this.updateFlagBigPriceExport = true;
  }

}


