import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {ColourService} from "../service/colour.service";
import {CsvSecondService} from "../service/csvSecond.service";

@Component({
  selector: 'chart-big-second-detailed',
  templateUrl: './chart-big-second-detailed.component.html',
})
export class ChartBigSecondDetailedComponent implements OnInit {

  // Chart
  highchartBigSecondDetailed: typeof Highcharts = Highcharts;
  public updateFlagBigSecondDetailed = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvSecondService: CsvSecondService, public enumService: EnumService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updateDetailedChart(this.enumService.toNumericMonth(this.displayMonth),this.displayYear);
  }

  chartOptionsBigSecondDetailed: any = {
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
    legend: {enabled: false},
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
      this.chartOptionsBigSecondDetailed.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptionsBigSecondDetailed.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptionsBigSecondDetailed.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptionsBigSecondDetailed.plotOptions.series.pointInterval = 15 * 60 * 1000
    }
    this.chartOptionsBigSecondDetailed.series[0] = {
      name: 'Hydro Pumped Storage',
      type: 'area',
      color: this.colourService.hydroPumpedStorage,
      data: this.csvSecondService.hydroPumpedStorage
    }
    this.chartOptionsBigSecondDetailed.series[1] = {
      name: 'Photovoltaics',
      type: 'area',
      color: this.colourService.photovoltaics,
      data: this.csvSecondService.photovoltaics
    }
    this.chartOptionsBigSecondDetailed.series[2] = {
      name: 'Wind Offshore',
      type: 'area',
      color: this.colourService.windOffshore,
      data: this.csvSecondService.windOffshore
    }
    this.chartOptionsBigSecondDetailed.series[3] = {
      name: 'Wind Onshore',
      type: 'area',
      color: this.colourService.windOnshore,
      data: this.csvSecondService.windOnshore
    }
    this.chartOptionsBigSecondDetailed.series[4] = {
      name: 'Biomass',
      type: 'area',
      color: this.colourService.biomass,
      data: this.csvSecondService.biomass
    }
    this.chartOptionsBigSecondDetailed.series[5] = {
      name: 'Hydro Power',
      type: 'area',
      color: this.colourService.hydroPower,
      data: this.csvSecondService.hydropower
    }
    this.chartOptionsBigSecondDetailed.series[6] = {
      name: 'Fossil Gas',
      type: 'area',
      color: this.colourService.fossilGas,
      data: this.csvSecondService.fossilGas
    }
    this.chartOptionsBigSecondDetailed.series[7] = {
      name: 'Nuclear',
      type: 'area',
      color: this.colourService.nuclear,
      data: this.csvSecondService.nuclear
    }
    this.chartOptionsBigSecondDetailed.series[8] = {
      name: 'Brown Coal',
      type: 'area',
      color: this.colourService.brownCoal,
      data: this.csvSecondService.brownCoal
    }
    this.chartOptionsBigSecondDetailed.series[9] = {
      name: 'Hard Coal',
      type: 'area',
      color: this.colourService.hardCoal,
      data: this.csvSecondService.hardCoal
    }
    this.chartOptionsBigSecondDetailed.series[10] = {
      name: 'Other',
      type: 'area',
      color: this.colourService.other,
      data: this.csvSecondService.other
    }
    this.chartOptionsBigSecondDetailed.series[11] = {
      name: 'total Grid load',
      type: 'line',
      color: this.colourService.totalGridLoad,
      data: this.csvSecondService.totalGridLoad
    }

    this.updateFlagBigSecondDetailed = true;
  }

}


