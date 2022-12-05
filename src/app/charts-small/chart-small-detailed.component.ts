import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Source} from '../service/enum.service';
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
  public Source = Source;
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
        name: this.Source.hydroPumpedStorage,
        color: this.colorService.hydroPumpedStorage,
        y: this.csvService.hydroPumpedStorageAggregated
      }, {
        name: this.Source.solar,
        color: this.colorService.photovoltaics,
        y: this.csvService.photovoltaicsAggregated
      }, {
        name: this.Source.windOffshore,
        color: this.colorService.windOffshore,
        y: this.csvService.windOffshoreAggregated
      }, {
        name: this.Source.windOnshore,
        color: this.colorService.windOnshore,
        y: this.csvService.windOnshoreAggregated
      }, {
        name: this.Source.biomass,
        color: this.colorService.biomass,
        y: this.csvService.biomassAggregated
      }, {
        name: this.Source.hydroPower,
        color: this.colorService.hydroPower,
        y: this.csvService.hydropowerAggregated
      }, {
        name: this.Source.fossilGas,
        color: this.colorService.fossilGas,
        y: this.csvService.fossilGasAggregated
      }, {
        name: this.Source.nuclear,
        color: this.colorService.nuclear,
        y: this.csvService.nuclearAggregated
      }, {
        name: this.Source.brownCoal,
        color: this.colorService.brownCoal,
        y: this.csvService.brownCoalAggregated
      }, {
        name: this.Source.hardCoal,
        color: this.colorService.hardCoal,
        y: this.csvService.hardCoalAggregated
      }, {
        name: this.Source.other,
        color: this.colorService.other,
        y: this.csvService.otherAggregated
      }]
    }]
    this.chartOptionsSmallDetailed.xAxis = {
      categories: this.updateCategories()
    }

    this.updateFlagSmallDetailed = true;
  }

  private updateCategories(): string[] {
    let categories = [[this.Source.hydroPumpedStorage, this.csvService.hydroPumpedStorageAggregated],
      [this.Source.solar, this.csvService.photovoltaicsAggregated],
      [this.Source.windOffshore, this.csvService.windOffshoreAggregated],
      [this.Source.windOnshore, this.csvService.windOnshoreAggregated],
      [this.Source.biomass, this.csvService.biomassAggregated],
      [this.Source.hydroPower, this.csvService.hydropowerAggregated],
      [this.Source.fossilGas, this.csvService.fossilGasAggregated],
      [this.Source.nuclear, this.csvService.nuclearAggregated],
      [this.Source.brownCoal, this.csvService.brownCoalAggregated],
      [this.Source.hardCoal, this.csvService.hardCoalAggregated],
      [this.Source.other, this.csvService.otherAggregated]];
    return categories.sort((a: any, b: any) => b[1] - a[1]).map((a:any) => a[0]);
  }
}
