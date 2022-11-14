import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Detail} from '../service/enum.service';
import {ChartService} from "../service/chart.service";
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";

@Component({
  selector: 'chart-small-summarized',
  templateUrl: './chart-small-summarized.component.html',
})
export class ChartSmallSummarizedComponent {

  // Chart
  highchartSmallSummarized: typeof Highcharts = Highcharts;
  @Input() public updateFlagSmallSummarized = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public chartService: ChartService, public colourService: ColourService) {
  }

  chartOptionsSmallSummarized: any = {
    chart: {
      type: 'column',
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
          /*formatter: function() {
            return this.y + '%';
          }*/
        }
      }
    },
    series: {},
  };

  updateSmallSummarizedChart() {
    this.chartOptionsSmallSummarized.series = [{
      name: 'Sum: ',
      data: [{
        name: 'Fossil',
        color: this.colourService.sumConventional,
        y: this.csvService.sumConventional.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Renewable',
        color: this.colourService.sumRenewables,
        y: this.csvService.sumRenewable.reduce((sum, current) => sum + current, 0)
      }]
    }]

    this.updateFlagSmallSummarized = true;
  }
}
