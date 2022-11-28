import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Source} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColorService} from "../service/color.service";

@Component({
  selector: 'chart-small-summarized',
  templateUrl: './chart-small-summarized.component.html',
})
export class ChartSmallSummarizedComponent implements OnInit {

  // Chart
  highchartSmallSummarized: typeof Highcharts = Highcharts;
  @Input() public updateFlagSmallSummarized = false;
  public chartRef!: Highcharts.Chart;
  public Source = Source;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colorService: ColorService) {
  }

  ngOnInit() {
    this.updateSmallSummarizedChart();
  }

  chartOptionsSmallSummarized: any = {
    chart: {
      type: 'bar',
    },
    xAxis: {
      categories:[],
      // categories: ['Hydro Pumped Storage', 'Photovoltaics', 'Wind Offshore', 'Wind Onshore', 'Biomass',
      // 'HydroPower', 'other Renewables', 'Fossil Gas', 'Nuclear', 'Brown Coal', 'Hard Coal', 'other Conventional',]

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
    },
    legend: {enabled: false},
    plotOptions: {
      series: {
        dataSorting: {
          enabled: true,
          matchByName: true
        },
        dataLabels: {
          enabled: true,
          formatter: function (): any {
            // @ts-ignore
            var pcnt = (this.y / this.series.data.map(p => p.y).reduce((a, b) => a + b, 0)) * 100;
            // @ts-ignore
            return Highcharts.numberFormat(pcnt) + '%';
          }
        }
      }
    },
    series: {},
  };

  updateSmallSummarizedChart() {
    this.chartOptionsSmallSummarized.series = [{
      name: 'Sum: ',
      data: [{
        name: this.Source.conventional,
        color: this.colorService.sumConventional,
        y: this.csvService.sumConventionalAggregated
      }, {
        name: this.Source.renewable,
        color: this.colorService.sumRenewables,
        y: this.csvService.sumRenewableAggregated
      }]
    }]

    this.chartOptionsSmallSummarized.xAxis = {
      categories: [[this.Source.conventional, this.csvService.sumConventionalAggregated],
        [this.Source.renewable, this.csvService.sumRenewableAggregated]].sort((a: any, b: any) => b[1] - a[1]).map((a:any) => a[0])
    }

    this.updateFlagSmallSummarized = true;
  }
}
