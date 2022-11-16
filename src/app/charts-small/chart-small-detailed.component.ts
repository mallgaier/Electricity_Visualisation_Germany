import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";

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

  constructor(private csvService: CsvService, public enumService: EnumService, public colourService: ColourService) {
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
        color: this.colourService.hydroPumpedStorage,
        y: this.csvService.hydroPumpedStorage.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Photovoltaics',
        color: this.colourService.photovoltaics,
        y: this.csvService.photovoltaics.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Wind Offshore',
        color: this.colourService.windOffshore,
        y: this.csvService.windOffshore.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Wind Onshore',
        color: this.colourService.windOnshore,
        y: this.csvService.windOnshore.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Biomass',
        color: this.colourService.biomass,
        y: this.csvService.biomass.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Hydro Power',
        color: this.colourService.hydroPower,
        y: this.csvService.hydropower.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Fossil Gas',
        color: this.colourService.fossilGas,
        y: this.csvService.fossilGas.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Nuclear',
        color: this.colourService.nuclear,
        y: this.csvService.nuclear.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Brown Coal',
        color: this.colourService.brownCoal,
        y: this.csvService.brownCoal.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Hard Coal',
        color: this.colourService.hardCoal,
        y: this.csvService.hardCoal.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Other',
        color: this.colourService.other,
        y: this.csvService.other.reduce((sum, current) => sum + current, 0)
      }]
    }]

    this.updateFlagSmallDetailed = true;
  }
}
