import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColorService} from "../service/color.service";

@Component({
  selector: 'chart-small-detailed',
  templateUrl: './chart-small-detailed.component.html',
})
export class ChartSmallDetailedComponent implements OnInit {

  // Chart
  highchartSmallDetailed: typeof Highcharts = Highcharts;
  @Input() public updateFlagSmallDetailed = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colorService: ColorService) {
  }

  ngOnInit(): void {
    this.updateSmallDetailedChart();
  }

  chartOptionsSmallDetailed: any = {
    chart: {
      type: 'column',
    },
    /*   xAxis: {
         categories:[],
         // categories: ['Hydro Pumped Storage', 'Photovoltaics', 'Wind Offshore', 'Wind Onshore', 'Biomass',
         // 'HydroPower', 'other Renewables', 'Fossil Gas', 'Nuclear', 'Brown Coal', 'Hard Coal', 'other Conventional',]
       },*/
    yAxis: {
      title: {
        text: 'Aggregated Production'
      },
    },
    title: {
      text: '',
    },
    tooltip: {
      shared: true,
      headerFormat: '<b>{point.key}</b><br>',
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

  updateSmallDetailedChart() {
    this.chartOptionsSmallDetailed.series = [{
      name: 'Sum: ',
      data: [{
        name: 'Hydro Pumped Storage',
        color: this.colorService.hydroPumpedStorage,
        y: this.csvService.hydroPumpedStorageAggregated
      }, {
        name: 'Photovoltaics',
        color: this.colorService.photovoltaics,
        y: this.csvService.photovoltaicsAggregated
      }, {
        name: 'Wind Offshore',
        color: this.colorService.windOffshore,
        y: this.csvService.windOffshoreAggregated
      }, {
        name: 'Wind Onshore',
        color: this.colorService.windOnshore,
        y: this.csvService.windOnshoreAggregated
      }, {
        name: 'Biomass',
        color: this.colorService.biomass,
        y: this.csvService.biomassAggregated
      }, {
        name: 'Hydro Power',
        color: this.colorService.hydroPower,
        y: this.csvService.hydropowerAggregated
      }, {
        name: 'Fossil Gas',
        color: this.colorService.fossilGas,
        y: this.csvService.fossilGasAggregated
      }, {
        name: 'Nuclear',
        color: this.colorService.nuclear,
        y: this.csvService.nuclearAggregated
      }, {
        name: 'Brown Coal',
        color: this.colorService.brownCoal,
        y: this.csvService.brownCoalAggregated
      }, {
        name: 'Hard Coal',
        color: this.colorService.hardCoal,
        y: this.csvService.hardCoalAggregated
      }, {
        name: 'Other',
        color: this.colorService.other,
        y: this.csvService.otherAggregated
      }]
    }]
    this.chartOptionsSmallDetailed.xAxis = {
      categories: []
    }

    this.updateFlagSmallDetailed = true;
  }
}
