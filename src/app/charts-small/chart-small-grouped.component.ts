import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColorService} from "../service/color.service";

@Component({
  selector: 'chart-small-grouped',
  templateUrl: './chart-small-grouped.component.html',
})
export class ChartSmallGroupedComponent implements OnInit{

  // Chart
  highchartSmallGrouped: typeof Highcharts = Highcharts;
  @Input() public updateFlagSmallGrouped = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colorService: ColorService) {
  }

  ngOnInit() {
    this.updateSmallGroupedChart();
  }

  chartOptionsSmallGrouped: any = {
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

  updateSmallGroupedChart() {
    this.chartOptionsSmallGrouped.series = [{
      name: 'Sum: ',
      data: [{
        name: 'Hydro Power',
        color: this.colorService.hydroPumpedStorage,
        y: this.csvService.hydroPowerSummed.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Photovoltaics',
        color: this.colorService.photovoltaics,
        y: this.csvService.photovoltaics.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Wind',
        color: this.colorService.windOffshore,
        y: this.csvService.sumWind.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Biomass',
        color: this.colorService.biomass,
        y: this.csvService.biomass.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Fossil Gas',
        color: this.colorService.fossilGas,
        y: this.csvService.fossilGas.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Nuclear',
        color: this.colorService.nuclear,
        y: this.csvService.nuclear.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Coal',
        color: this.colorService.brownCoal,
        y: this.csvService.sumCoal.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Other',
        color: this.colorService.other,
        y: this.csvService.other.reduce((sum, current) => sum + current, 0)
      }]
    }]

    this.updateFlagSmallGrouped = true;
  }
}
