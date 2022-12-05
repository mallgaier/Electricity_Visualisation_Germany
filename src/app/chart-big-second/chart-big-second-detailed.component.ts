import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Source} from '../service/enum.service';
import {ColorService} from "../service/color.service";
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
  public Source = Source;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvSecondService: CsvSecondService, public enumService: EnumService, public colorService: ColorService) {
  }

  ngOnInit(): void {
    this.updateDetailedChart(this.enumService.toNumericMonth(this.displayMonth), this.displayYear);
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
      series: {},
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
      name: this.Source.hydroPumpedStorage,
      type: 'area',
      color: this.colorService.hydroPumpedStorage,
      data: this.csvSecondService.hydroPumpedStorage
    }
    this.chartOptionsBigSecondDetailed.series[1] = {
      name: this.Source.solar,
      type: 'area',
      color: this.colorService.photovoltaics,
      data: this.csvSecondService.photovoltaics
    }
    this.chartOptionsBigSecondDetailed.series[2] = {
      name: this.Source.windOffshore,
      type: 'area',
      color: this.colorService.windOffshore,
      data: this.csvSecondService.windOffshore
    }
    this.chartOptionsBigSecondDetailed.series[3] = {
      name: this.Source.windOnshore,
      type: 'area',
      color: this.colorService.windOnshore,
      data: this.csvSecondService.windOnshore
    }
    this.chartOptionsBigSecondDetailed.series[4] = {
      name: this.Source.fossilGas,
      type: 'area',
      color: this.colorService.fossilGas,
      data: this.csvSecondService.fossilGas
    }
    this.chartOptionsBigSecondDetailed.series[5] = {
      name: this.Source.hardCoal,
      type: 'area',
      color: this.colorService.hardCoal,
      data: this.csvSecondService.hardCoal
    }
    this.chartOptionsBigSecondDetailed.series[6] = {
      name: this.Source.brownCoal,
      type: 'area',
      color: this.colorService.brownCoal,
      data: this.csvSecondService.brownCoal
    }
    this.chartOptionsBigSecondDetailed.series[7] = {
      name: this.Source.nuclear,
      type: 'area',
      color: this.colorService.nuclear,
      data: this.csvSecondService.nuclear
    }
    this.chartOptionsBigSecondDetailed.series[8] = {
      name: this.Source.hydroPower,
      type: 'area',
      color: this.colorService.hydroPower,
      data: this.csvSecondService.hydropower
    }
    this.chartOptionsBigSecondDetailed.series[9] = {
      name: this.Source.biomass,
      type: 'area',
      color: this.colorService.biomass,
      data: this.csvSecondService.biomass
    }
    this.chartOptionsBigSecondDetailed.series[10] = {
      name: this.Source.other,
      type: 'area',
      color: this.colorService.other,
      data: this.csvSecondService.other
    }
    if (this.displayMonth !== Month.Year) {
      this.chartOptionsBigSecondDetailed.series[11] = {
        name: this.Source.totalGridLoad,
        type: 'line',
        color: this.colorService.totalGridLoad,
        data: this.csvSecondService.totalGridLoad
      }
    }

    this.updateFlagBigSecondDetailed = true;
  }

}


