import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";

@Component({
  selector: 'chart-big-detailed',
  templateUrl: './chart-big-detailed.component.html',
})
export class ChartBigDetailedComponent implements OnInit {

  // Chart
  highchartBigDetailed: typeof Highcharts = Highcharts;
  public updateFlagBigDetailed = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updateDetailedChart(this.enumService.toNumericMonth(this.displayMonth),this.displayYear);
  }

  chartOptionsBigDetailed: any = {
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

  updateDetailedChart(monthNumeric: number, yearNumeric: number) {
    if (monthNumeric === 0) {
      this.chartOptionsBigDetailed.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptionsBigDetailed.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptionsBigDetailed.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptionsBigDetailed.plotOptions.series.pointInterval = 15 * 60 * 1000
    }
    this.chartOptionsBigDetailed.series[0] = {
      name: 'Hydro Pumped Storage',
      type: 'area',
      color: this.colourService.hydroPumpedStorage,
      data: this.csvService.hydroPumpedStorage
    }
    this.chartOptionsBigDetailed.series[1] = {
      name: 'Photovoltaics',
      type: 'area',
      color: this.colourService.photovoltaics,
      data: this.csvService.photovoltaics
    }
    this.chartOptionsBigDetailed.series[2] = {
      name: 'Wind Offshore',
      type: 'area',
      color: this.colourService.windOffshore,
      data: this.csvService.windOffshore
    }
    this.chartOptionsBigDetailed.series[3] = {
      name: 'Wind Onshore',
      type: 'area',
      color: this.colourService.windOnshore,
      data: this.csvService.windOnshore
    }
    this.chartOptionsBigDetailed.series[4] = {
      name: 'Biomass',
      type: 'area',
      color: this.colourService.biomass,
      data: this.csvService.biomass
    }
    this.chartOptionsBigDetailed.series[5] = {
      name: 'Hydro Power',
      type: 'area',
      color: this.colourService.hydroPower,
      data: this.csvService.hydropower
    }
    this.chartOptionsBigDetailed.series[6] = {
      name: 'Fossil Gas',
      type: 'area',
      color: this.colourService.fossilGas,
      data: this.csvService.fossilGas
    }
    this.chartOptionsBigDetailed.series[7] = {
      name: 'Nuclear',
      type: 'area',
      color: this.colourService.nuclear,
      data: this.csvService.nuclear
    }
    this.chartOptionsBigDetailed.series[8] = {
      name: 'Brown Coal',
      type: 'area',
      color: this.colourService.brownCoal,
      data: this.csvService.brownCoal
    }
    this.chartOptionsBigDetailed.series[9] = {
      name: 'Hard Coal',
      type: 'area',
      color: this.colourService.hardCoal,
      data: this.csvService.hardCoal
    }
    this.chartOptionsBigDetailed.series[10] = {
      name: 'Other',
      type: 'area',
      color: this.colourService.other,
      data: this.csvService.other
    }
    this.chartOptionsBigDetailed.series[11] = {
      name: 'total Grid load',
      type: 'line',
      color: this.colourService.totalGridLoad,
      data: this.csvService.totalGridLoad
    }

    this.updateFlagBigDetailed = true;
  }

}


