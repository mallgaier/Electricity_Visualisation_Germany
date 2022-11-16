import {Component, Input, OnInit} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Year} from '../service/enum.service';
import {CsvService} from "../service/csv.service";
import {ColourService} from "../service/colour.service";

@Component({
  selector: 'chart-big-price-generation-grouped',
  templateUrl: './chart-big-price-generation-grouped.component.html',
})
export class ChartBigPriceGenerationGroupedComponent implements OnInit {

  // Chart
  highchartBigPriceGenerationGrouped: typeof Highcharts = Highcharts;
  public updateFlagBigPriceGenerationGrouped = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;

  constructor(private csvService: CsvService, public enumService: EnumService, public colourService: ColourService) {
  }

  ngOnInit(): void {
    this.updateGroupedChart(this.enumService.toNumericMonth(this.displayMonth),this.displayYear);
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
      this.chartOptionsBigPriceGenerationGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptionsBigPriceGenerationGrouped.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptionsBigPriceGenerationGrouped.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptionsBigPriceGenerationGrouped.plotOptions.series.pointInterval = 15 * 60 * 1000
    }

    this.chartOptionsBigPriceGenerationGrouped.series[0] = {
      name: 'Hydro Power',
      type: 'area',
      color: this.colourService.hydroPumpedStorage,
      data: this.csvService.hydroPowerSummed,
    }
    this.chartOptionsBigPriceGenerationGrouped.series[1] = {
      name: 'Photovoltaics',
      type: 'area',
      color: this.colourService.photovoltaics,
      data: this.csvService.photovoltaics
    }
    this.chartOptionsBigPriceGenerationGrouped.series[2] = {
      name: 'Wind',
      type: 'area',
      color: this.colourService.windOffshore,
      data: this.csvService.sumWind,

    }
    this.chartOptionsBigPriceGenerationGrouped.series[3] = {
      name: 'Biomass',
      type: 'area',
      color: this.colourService.biomass,
      data: this.csvService.biomass
    }
    this.chartOptionsBigPriceGenerationGrouped.series[4] = {
      name: 'Fossil Gas',
      type: 'area',
      color: this.colourService.fossilGas,
      data: this.csvService.fossilGas
    }
    this.chartOptionsBigPriceGenerationGrouped.series[5] = {
      name: 'Nuclear',
      type: 'area',
      color: this.colourService.nuclear,
      data: this.csvService.nuclear
    }
    this.chartOptionsBigPriceGenerationGrouped.series[6] = {
      name: 'Coal',
      type: 'area',
      color: this.colourService.brownCoal,
      data: this.csvService.sumCoal
    }
    this.chartOptionsBigPriceGenerationGrouped.series[7] = {
      name: 'Other',
      type: 'area',
      color: this.colourService.other,
      data: this.csvService.other
    }
    this.chartOptionsBigPriceGenerationGrouped.series[8] = {
      name: 'day-Ahead Price',
      type: 'line',
      yAxis: 1,
      color: this.colourService.dayAheadPrice,
      data: this.csvService.dayAheadPrice
    }

    this.updateFlagBigPriceGenerationGrouped = true;
  }

}


