import {Component, Input} from "@angular/core";
import * as Highcharts from 'highcharts';
import {EnumService, Month, Source, Year} from '../service/enum.service';
import {ColorService} from "../service/color.service";
import {CsvHeatmapService} from "../service/csvHeatmap.service";
import HC_map from 'highcharts/modules/map';

HC_map(Highcharts);

@Component({
  selector: 'chart-source-heatmap',
  templateUrl: './chart-source-heatmap.component.html',
})
export class ChartSourceHeatmapComponent {

  // Chart
  highchartSourceHeatmap: typeof Highcharts = Highcharts;
  public updateFlagSourceHeatmap = false;
  public chartRef!: Highcharts.Chart;
  @Input() public displayMonth = Month as any;
  @Input() public displayYear = Year as any;
  @Input() public source = Source as any;

  constructor(private csvHeatmapService: CsvHeatmapService, public enumService: EnumService, public colorService: ColorService) {
  }


  chartOptionsSourceHeatmap: any = {
    chart: {
      type: 'heatmap',
    },
    xAxis: {
      categories: ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'],
      tickInterval: 8
    },
    yAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      reversed: true,
      title: '',
    },
    title: {
      text: '',
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 12,
      verticalAlign: 'top',
      y: 50,
      symbolHeight: 500
    },
    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      startOnTick: true,
      endOnTick: true,
      labels: {
        format: '{value}%'
      }
    },
    tooltip: {
      formatter: function (): any {
        // @ts-ignore
        return '<b>' + this.point.series['yAxis'].categories[this.point['y']] + 's </b> at <b>' + this.point.series['xAxis'].categories[this.point['x']] + '<br>' + this.point.value + '%</b> to the total generation';
      }
    },
    series: [{
      data: this.csvHeatmapService.heatmap,
      borderWidth: 1,
      dataLabels: {
        enabled: false,
      }
    }]
  };

  updatedChart(source: Source) {
    if (source === Source.hydroPumpedStorage) {
      this.updatedChartForHydroPumedStorageCombined();
    } else {
      this.chartOptionsSourceHeatmap.series[0].data = this.csvHeatmapService.heatmap;
      this.chartOptionsSourceHeatmap.colorAxis = {
        stops: this.colorService.sourceToSequentialColorScale(source),
        min: 0,
        startOnTick: true,
        endOnTick: true,
        labels: {
          format: '{value}%'
        }
      }
      this.updateFlagSourceHeatmap = true;
    }
  }

  updatedChartForHydroPumedStorageCombined() {
    this.chartOptionsSourceHeatmap.series[0].data = this.csvHeatmapService.heatmap;
    const min = (this.csvHeatmapService.minHydroPumpedStorageCombined % 2 === 0) ? this.csvHeatmapService.minHydroPumpedStorageCombined : this.csvHeatmapService.minHydroPumpedStorageCombined - 1;
    const max = (this.csvHeatmapService.maxHydroPumpedStorageCombined % 2 === 0) ? this.csvHeatmapService.maxHydroPumpedStorageCombined : this.csvHeatmapService.maxHydroPumpedStorageCombined + 1;
    const tick0 = Math.round((-min / (-min + max)) * 100) / 100;
    const tickNegative = Math.round(tick0 / 4 * 100) / 100;
    const tickPositive = Math.round((1 - tick0) / 4 * 100) / 100;
    this.chartOptionsSourceHeatmap.colorAxis = {
      stops: [
        [0, '#67001f'],
        [tickNegative, '#b2182b'],
        [2 * tickNegative, '#d6604d'],
        [3 * tickNegative, '#f4a582'],
        [tick0 - 0.01, '#fddbc7'],
        [tick0, '#f7f7f7'],
        [tick0 + 0.01, '#d1e5f0'],
        [tick0 + tickPositive, '#92c5de'],
        [tick0 + 2 * tickPositive, '#4393c3'],
        [tick0 + 3 * tickPositive, '#2166ac'],
        [1, '#053061'],
      ],
      min: this.csvHeatmapService.minHydroPumpedStorageCombined,
      max: this.csvHeatmapService.maxHydroPumpedStorageCombined,
      startOnTick: true,
      endOnTick: true,
      labels: {
        format: '{value}%'
      }
    }
    this.chartOptionsSourceHeatmap.tooltip = {
      formatter: function (): any {
        // @ts-ignore
        return '<b>' + this.point.series['yAxis'].categories[this.point['y']] + 's </b> at <b>' + this.point.series['xAxis'].categories[this.point['x']] + '</b><br>Hydro Pumped Storage ' + (this.point.value < 0 ? ('<b style="color:#b2182b;">used</b>' + '<br><b>' + -this.point.value + '%</b> of the total generation') : ('<b style="color:#2166ac;">contributed</b>' + '<br><b>' + this.point.value + '%</b> to the total generation'));
      }
    }
    this.updateFlagSourceHeatmap = true;
  }

}


