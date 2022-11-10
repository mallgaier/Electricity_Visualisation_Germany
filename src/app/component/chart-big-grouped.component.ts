import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Detail} from '../service/enum.service';
import {ChartService} from "../service/chart.service";
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";

@Component({
  selector: 'chart-big-grouped',
  templateUrl: './chart-big-grouped.component.html',
})
export class ChartBigGroupedComponent implements OnInit {

  // Chart
  highchartBigGrouped: typeof Highcharts = Highcharts;
  public updateFlagBigGrouped = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public chartService: ChartService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updateGroupedChart(this.enumService.toNumericMonth(this.displayMonth),this.displayYear);
  }

  chartOptionsBigGrouped: any = {
    chart: {
      type: 'area',
      zoomType: 'x',
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime',
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
      xDateFormat: '%A %d.%m.%Y %k:%M'
    },
    plotOptions: {
      series: {
      },
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,

        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    },
    series: [{}]
  };

  updateGroupedChart(monthNumeric: number, yearNumeric: number) {
    if (monthNumeric === 0) {
      this.chartOptionsBigGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptionsBigGrouped.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptionsBigGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptionsBigGrouped.plotOptions.series.pointInterval = 15 * 60 * 1000
    }

    this.chartOptionsBigGrouped.colors = [
      this.colourService.hydroPumpedStorage,
      this.colourService.photovoltaics,
      this.colourService.windOffshore,
      this.colourService.windOnshore,
      this.colourService.biomass,
      this.colourService.hydroPower,
      this.colourService.fossilGas,
      this.colourService.nuclear,
      this.colourService.brownCoal,
      this.colourService.hardCoal,
      this.colourService.otherConventional,
      this.colourService.totalDemand
    ]
    this.chartOptionsBigGrouped.series[0] = {
      name: 'Hydro Pumped Storage',
      type: 'area',
      data: this.csvService.hydroPumpedStorage
    }
    this.chartOptionsBigGrouped.series[1] = {
      name: 'Photovoltaics',
      type: 'area',
      data: this.csvService.photovoltaics
    }
    this.chartOptionsBigGrouped.series[2] = {
      name: 'Wind Offshore',
      type: 'area',
      data: this.csvService.windOffshore

    }
    this.chartOptionsBigGrouped.series[3] = {
      name: 'Wind Onshore',
      type: 'area',
      data: this.csvService.windOnshore
    }
    this.chartOptionsBigGrouped.series[4] = {
      name: 'Biomass',
      type: 'area',
      data: this.csvService.biomass
    }
    this.chartOptionsBigGrouped.series[5] = {
      name: 'Hydro Power',
      type: 'area',
      data: this.csvService.hydropower
    }
    this.chartOptionsBigGrouped.series[6] = {
      name: 'Fossil Gas',
      type: 'area',
      data: this.csvService.fossilGas
    }
    this.chartOptionsBigGrouped.series[7] = {
      name: 'Nuclear',
      type: 'area',
      data: this.csvService.nuclear
    }
    this.chartOptionsBigGrouped.series[8] = {
      name: 'Brown Coal',
      type: 'area',
      data: this.csvService.brownCcoal
    }
    this.chartOptionsBigGrouped.series[9] = {
      name: 'Hard Coal',
      type: 'area',
      data: this.csvService.hardCoal
    }
    this.chartOptionsBigGrouped.series[10] = {
      name: 'Other',
      type: 'area',
      data: this.csvService.otherConventional
    }
    this.chartOptionsBigGrouped.series[11] = {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }

    this.updateFlagBigGrouped = true;
  }

}


