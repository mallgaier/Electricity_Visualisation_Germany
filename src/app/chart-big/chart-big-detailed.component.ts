import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Source} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColorService} from "../service/color.service";

@Component({
  selector: 'chart-big-detailed',
  templateUrl: './chart-big-detailed.component.html',
})
export class ChartBigDetailedComponent implements OnInit {

  // Chart
  highchartBigDetailed: typeof Highcharts = Highcharts;
  public updateFlagBigDetailed = false;
  public chartRef!: Highcharts.Chart;
public Source = Source;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colorService: ColorService) {
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
      name: this.Source.hydroPumpedStorage,
      type: 'area',
      color: this.colorService.hydroPumpedStorage,
      data: this.csvService.hydroPumpedStorage
    }
    this.chartOptionsBigDetailed.series[1] = {
      name: this.Source.solar,
      type: 'area',
      color: this.colorService.photovoltaics,
      data: this.csvService.photovoltaics
    }
    this.chartOptionsBigDetailed.series[2] = {
      name: this.Source.windOffshore,
      type: 'area',
      color: this.colorService.windOffshore,
      data: this.csvService.windOffshore
    }
    this.chartOptionsBigDetailed.series[3] = {
      name: this.Source.windOnshore,
      type: 'area',
      color: this.colorService.windOnshore,
      data: this.csvService.windOnshore
    }
    this.chartOptionsBigDetailed.series[4] = {
      name: this.Source.fossilGas,
      type: 'area',
      color: this.colorService.fossilGas,
      data: this.csvService.fossilGas
    }
    this.chartOptionsBigDetailed.series[5] = {
      name: this.Source.hardCoal,
      type: 'area',
      color: this.colorService.hardCoal,
      data: this.csvService.hardCoal
    }
    this.chartOptionsBigDetailed.series[6] = {
      name: this.Source.brownCoal,
      type: 'area',
      color: this.colorService.brownCoal,
      data: this.csvService.brownCoal
    }
    this.chartOptionsBigDetailed.series[7] = {
      name: this.Source.nuclear,
      type: 'area',
      color: this.colorService.nuclear,
      data: this.csvService.nuclear
    }
    this.chartOptionsBigDetailed.series[8] = {
      name: this.Source.hydroPower,
      type: 'area',
      color: this.colorService.hydroPower,
      data: this.csvService.hydropower
    }
    this.chartOptionsBigDetailed.series[9] = {
      name: this.Source.biomass,
      type: 'area',
      color: this.colorService.biomass,
      data: this.csvService.biomass
    }
    this.chartOptionsBigDetailed.series[10] = {
      name: this.Source.other,
      type: 'area',
      color: this.colorService.other,
      data: this.csvService.other
    }
    if (this.displayMonth !== Month.Year) {
      this.chartOptionsBigDetailed.series[11] = {
        name: this.Source.totalGridLoad,
        type: 'line',
        color: this.colorService.totalGridLoad,
        data: this.csvService.totalGridLoad
      }
    }

    this.updateFlagBigDetailed = true;
  }

}


