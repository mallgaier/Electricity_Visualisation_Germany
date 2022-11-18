import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {ColorService} from "../service/color.service";
import {CsvSecondService} from "../service/csvSecond.service";

@Component({
  selector: 'chart-big-second-grouped',
  templateUrl: './chart-big-second-grouped.component.html',
})
export class ChartBigSecondGroupedComponent implements OnInit {

  // Chart
  highchartBigSecondGrouped: typeof Highcharts = Highcharts;
  public updateFlagBigSecondGrouped = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvSecondService: CsvSecondService, public enumService: EnumService, public colorService: ColorService) {
  }

  ngOnInit(): void {
    this.updateGroupedChart(this.enumService.toNumericMonth(this.displayMonth),this.displayYear);
  }

  chartOptionsBigSecondGrouped: any = {
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

  updateGroupedChart(monthNumeric: number, yearNumeric: number) {
    if (monthNumeric === 0) {
      this.chartOptionsBigSecondGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptionsBigSecondGrouped.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptionsBigSecondGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptionsBigSecondGrouped.plotOptions.series.pointInterval = 15 * 60 * 1000
    }
    this.chartOptionsBigSecondGrouped.series[0] = {
      name: 'Hydro Power',
      type: 'area',
      color: this.colorService.hydroPumpedStorage,
      data: this.csvSecondService.hydroPowerSummed,
    }
    this.chartOptionsBigSecondGrouped.series[1] = {
      name: 'Photovoltaics',
      type: 'area',
      color: this.colorService.photovoltaics,
      data: this.csvSecondService.photovoltaics
    }
    this.chartOptionsBigSecondGrouped.series[2] = {
      name: 'Wind',
      type: 'area',
      color: this.colorService.windOffshore,
      data: this.csvSecondService.sumWind,

    }
    this.chartOptionsBigSecondGrouped.series[3] = {
      name: 'Biomass',
      type: 'area',
      color: this.colorService.biomass,
      data: this.csvSecondService.biomass
    }
    this.chartOptionsBigSecondGrouped.series[4] = {
      name: 'Fossil Gas',
      type: 'area',
      color: this.colorService.fossilGas,
      data: this.csvSecondService.fossilGas
    }
    this.chartOptionsBigSecondGrouped.series[5] = {
      name: 'Nuclear',
      type: 'area',
      color: this.colorService.nuclear,
      data: this.csvSecondService.nuclear
    }
    this.chartOptionsBigSecondGrouped.series[6] = {
      name: 'Coal',
      type: 'area',
      color: this.colorService.brownCoal,
      data: this.csvSecondService.sumCoal
    }
    this.chartOptionsBigSecondGrouped.series[7] = {
      name: 'Other',
      type: 'area',
      color: this.colorService.other,
      data: this.csvSecondService.other
    }
    this.chartOptionsBigSecondGrouped.series[8] = {
      name: 'total Grid load',
      type: 'line',
      color: this.colorService.totalGridLoad,
      data: this.csvSecondService.totalGridLoad
    }

    this.updateFlagBigSecondGrouped = true;
  }

}


