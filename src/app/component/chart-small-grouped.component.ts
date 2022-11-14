import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Detail} from '../service/enum.service';
import {ChartService} from "../service/chart.service";
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";

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

  constructor(private csvService: CsvService, public enumService: EnumService, public chartService: ChartService, public colourService: ColourService) {
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
        name: 'Water',
        color: this.colourService.hydroPumpedStorage,
        y: this.csvService.hydroPumpedStorage.reduce((sum, current) => sum + current, 0) + this.csvService.hydropower.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Photovoltaics',
        color: this.colourService.photovoltaics,
        y: this.csvService.photovoltaics.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Wind',
        color: this.colourService.windOffshore,
        y: this.csvService.windOffshore.reduce((sum, current) => sum + current, 0) + this.csvService.windOnshore.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Biomass',
        color: this.colourService.biomass,
        y: this.csvService.biomass.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Fossil Gas',
        color: this.colourService.fossilGas,
        y: this.csvService.fossilGas.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Nuclear',
        color: this.colourService.nuclear,
        y: this.csvService.nuclear.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Coal',
        color: this.colourService.brownCoal,
        y: this.csvService.brownCcoal.reduce((sum, current) => sum + current, 0) + this.csvService.hardCoal.reduce((sum, current) => sum + current, 0)
      }, {
        name: 'Other',
        color: this.colourService.otherConventional,
        y: this.csvService.otherConventional.reduce((sum, current) => sum + current, 0)
      }]
    }]

    this.updateFlagSmallGrouped = true;
  }
}
