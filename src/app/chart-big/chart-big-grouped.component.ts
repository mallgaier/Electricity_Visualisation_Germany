import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Source} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColorService} from "../service/color.service";

@Component({
  selector: 'chart-big-grouped',
  templateUrl: './chart-big-grouped.component.html',
})
export class ChartBigGroupedComponent implements OnInit {

  // Chart
  highchartBigGrouped: typeof Highcharts = Highcharts;
  public updateFlagBigGrouped = false;
  public chartRef!: Highcharts.Chart;
  public Source = Source;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colorService: ColorService) {
  }

  ngOnInit(): void {
    this.updateGroupedChart(this.enumService.toNumericMonth(this.displayMonth), this.displayYear);
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

  updateGroupedChart(monthNumeric: number, yearNumeric: number) {
    if (monthNumeric === 0) {
      this.chartOptionsBigGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptionsBigGrouped.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptionsBigGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptionsBigGrouped.plotOptions.series.pointInterval = 15 * 60 * 1000
    }

    this.chartOptionsBigGrouped.colors = [
      this.colorService.hydroPumpedStorage,
      this.colorService.photovoltaics,
      this.colorService.windOffshore,
      this.colorService.windOnshore,
      this.colorService.biomass,
      this.colorService.hydroPower,
      this.colorService.fossilGas,
      this.colorService.nuclear,
      this.colorService.brownCoal,
      this.colorService.hardCoal,
      this.colorService.other,
      this.colorService.totalGridLoad
    ]
    this.chartOptionsBigGrouped.series[0] = {
      name: this.Source.hydroPower,
      type: 'area',
      color: this.colorService.hydroPumpedStorage,
      data: this.csvService.hydroPowerSummed,
    }
    this.chartOptionsBigGrouped.series[1] = {
      name: this.Source.photovoltaics,
      type: 'area',
      color: this.colorService.photovoltaics,
      data: this.csvService.photovoltaics
    }
    this.chartOptionsBigGrouped.series[2] = {
      name: this.Source.wind,
      type: 'area',
      color: this.colorService.windOffshore,
      data: this.csvService.sumWind,
    }
    this.chartOptionsBigGrouped.series[3] = {
      name: this.Source.fossilGas,
      type: 'area',
      color: this.colorService.fossilGas,
      data: this.csvService.fossilGas
    }
    this.chartOptionsBigGrouped.series[4] = {
      name: this.Source.coal,
      type: 'area',
      color: this.colorService.brownCoal,
      data: this.csvService.sumCoal
    }
    this.chartOptionsBigGrouped.series[5] = {
      name: this.Source.nuclear,
      type: 'area',
      color: this.colorService.nuclear,
      data: this.csvService.nuclear
    }
    this.chartOptionsBigGrouped.series[6] = {
      name: this.Source.biomass,
      type: 'area',
      color: this.colorService.biomass,
      data: this.csvService.biomass
    }
    this.chartOptionsBigGrouped.series[7] = {
      name: this.Source.other,
      type: 'area',
      color: this.colorService.other,
      data: this.csvService.other
    }
    if (this.displayMonth !== Month.Year) {
      this.chartOptionsBigGrouped.series[8] = {
        name: this.Source.totalGridLoad,
        type: 'line',
        color: this.colorService.totalGridLoad,
        data: this.csvService.totalGridLoad
      }
    }

    this.updateFlagBigGrouped = true;
  }

}


