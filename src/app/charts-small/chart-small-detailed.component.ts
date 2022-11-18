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

  updateSmallDetailedChart() {
    this.chartOptionsSmallDetailed.series = [{
      name: 'Sum: ',
      data: [{
        name: 'Hydro Pumped Storage',
        color: this.colorService.hydroPumpedStorage,
        y: this.csvService.hydroPumpedStorage.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Photovoltaics',
        color: this.colorService.photovoltaics,
        y: this.csvService.photovoltaics.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Wind Offshore',
        color: this.colorService.windOffshore,
        y: this.csvService.windOffshore.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Wind Onshore',
        color: this.colorService.windOnshore,
        y: this.csvService.windOnshore.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Biomass',
        color: this.colorService.biomass,
        y: this.csvService.biomass.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Hydro Power',
        color: this.colorService.hydroPower,
        y: this.csvService.hydropower.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Fossil Gas',
        color: this.colorService.fossilGas,
        y: this.csvService.fossilGas.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Nuclear',
        color: this.colorService.nuclear,
        y: this.csvService.nuclear.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Brown Coal',
        color: this.colorService.brownCoal,
        y: this.csvService.brownCoal.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Hard Coal',
        color: this.colorService.hardCoal,
        y: this.csvService.hardCoal.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Other',
        color: this.colorService.other,
        y: this.csvService.other.reduce((sum, current) => sum + current, 0)
      }]
    }]

    this.updateFlagSmallDetailed = true;
  }
}
