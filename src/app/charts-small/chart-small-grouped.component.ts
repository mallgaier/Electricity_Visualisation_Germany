import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Source} from '../service/enum.service';
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
  public Source = Source;
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

  updateSmallGroupedChart() {
    this.chartOptionsSmallGrouped.series = [{
      name: 'Sum: ',
      data: [{
        name: this.Source.hydroPowerCombined,
        color: this.colorService.hydroPumpedStorage,
        y: this.csvService.sumHydroPowerAggregated
      }, {
        name: this.Source.photovoltaics,
        color: this.colorService.photovoltaics,
        y: this.csvService.photovoltaicsAggregated
      }, {
        name: this.Source.wind,
        color: this.colorService.windOffshore,
        y: this.csvService.sumWindAggregated
      }, {
        name: this.Source.biomass,
        color: this.colorService.biomass,
        y: this.csvService.biomassAggregated
      }, {
        name: this.Source.fossilGas,
        color: this.colorService.fossilGas,
        y: this.csvService.fossilGasAggregated
      }, {
        name: this.Source.nuclear,
        color: this.colorService.nuclear,
        y: this.csvService.nuclearAggregated
      }, {
        name: this.Source.coal,
        color: this.colorService.brownCoal,
        y: this.csvService.sumCoalAggregated
      }, {
        name: this.Source.other,
        color: this.colorService.other,
        y: this.csvService.otherAggregated
      }]
    }]

    this.chartOptionsSmallGrouped.xAxis = {
      categories: this.updateCategories()
    }

    this.updateFlagSmallGrouped = true;
  }

  private updateCategories(): string[] {
    let categories = [[this.Source.hydroPowerCombined, this.csvService.sumHydroPowerAggregated],
      [this.Source.photovoltaics, this.csvService.photovoltaicsAggregated],
      [this.Source.wind, this.csvService.sumWindAggregated],
      [this.Source.biomass, this.csvService.biomassAggregated],
      [this.Source.fossilGas, this.csvService.fossilGasAggregated],
      [this.Source.nuclear, this.csvService.nuclearAggregated],
      [this.Source.coal, this.csvService.sumCoalAggregated],
      [this.Source.other, this.csvService.otherAggregated]];
    return categories.sort((a: any, b: any) => b[1] - a[1]).map((a:any) => a[0]);
  }
}
