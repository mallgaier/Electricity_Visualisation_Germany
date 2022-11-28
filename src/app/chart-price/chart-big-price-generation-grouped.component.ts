import {Component, Input} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year, Source} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColorService} from "../service/color.service";

@Component({
  selector: 'chart-big-price-generation-grouped',
  templateUrl: './chart-big-price-generation-grouped.component.html',
})
export class ChartBigPriceGenerationGroupedComponent {

  // Chart
  highchartBigPriceGenerationGrouped: typeof Highcharts = Highcharts;
  public updateFlagBigPriceGenerationGrouped = false;
  public chartRef!: Highcharts.Chart;
  public Source = Source;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colorService: ColorService) {
  }


  chartOptionsBigPriceGenerationGrouped: any = {
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
    yAxis: [{
      labels: {
        format: '{value}',
      },
      title: {
        text: 'Generation (in MWh)'
      }
    }, {
      lineWidth: 1,
      opposite: true,
      labels: {
        format: '{value}€',
      },
      title: {
        text: 'Day-Ahead Price'
      }
    }],
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
      this.chartOptionsBigPriceGenerationGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptionsBigPriceGenerationGrouped.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptionsBigPriceGenerationGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptionsBigPriceGenerationGrouped.plotOptions.series.pointInterval = 15 * 60 * 1000
    }

    this.chartOptionsBigPriceGenerationGrouped.series[0] = {
      name: this.Source.hydroPower,
      type: 'area',
      color: this.colorService.hydroPumpedStorage,
      data: this.csvService.hydroPowerSummed,
    }
    this.chartOptionsBigPriceGenerationGrouped.series[1] = {
      name: this.Source.photovoltaics,
      type: 'area',
      color: this.colorService.photovoltaics,
      data: this.csvService.photovoltaics
    }
    this.chartOptionsBigPriceGenerationGrouped.series[2] = {
      name: this.Source.wind,
      type: 'area',
      color: this.colorService.windOffshore,
      data: this.csvService.sumWind,

    }
    this.chartOptionsBigPriceGenerationGrouped.series[3] = {
      name: this.Source.biomass,
      type: 'area',
      color: this.colorService.biomass,
      data: this.csvService.biomass
    }
    this.chartOptionsBigPriceGenerationGrouped.series[4] = {
      name: this.Source.fossilGas,
      type: 'area',
      color: this.colorService.fossilGas,
      data: this.csvService.fossilGas
    }
    this.chartOptionsBigPriceGenerationGrouped.series[5] = {
      name: this.Source.nuclear,
      type: 'area',
      color: this.colorService.nuclear,
      data: this.csvService.nuclear
    }
    this.chartOptionsBigPriceGenerationGrouped.series[6] = {
      name: this.Source.coal,
      type: 'area',
      color: this.colorService.brownCoal,
      data: this.csvService.sumCoal
    }
    this.chartOptionsBigPriceGenerationGrouped.series[7] = {
      name: this.Source.other,
      type: 'area',
      color: this.colorService.other,
      data: this.csvService.other
    }

    this.updateFlagBigPriceGenerationGrouped = true;
  }

}


