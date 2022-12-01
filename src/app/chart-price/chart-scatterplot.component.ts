import {Component, Input} from "@angular/core";
import * as Highcharts from 'highcharts';
import {ScatterGrouping, Source, Year} from '../service/enum.service';
import {CsvScatterService} from "../service/csvScatter.service";

@Component({
  selector: 'chart-scatterplot',
  templateUrl: './chart-scatterplot.component.html',
})
export class ChartScatterplotComponent {

  // Chart
  highchartBigScatterSeason: typeof Highcharts = Highcharts;
  highchartBigScatterYear: typeof Highcharts = Highcharts;
  public updateFlagBigScatterSeason = false;
  public updateFlagBigScatterYear = false;
  public chartRef!: Highcharts.Chart;
  public Source = Source;
  public ScatterGrouping = ScatterGrouping;
  public flag = false;
  @Input() public displayYear = Year as any;
  @Input() public scatterXAxis = Source as any;
  @Input() public scatterYAxis = Source as any;
  @Input() public scatterGrouping = ScatterGrouping as any;
  public internalScatterGrouping = ScatterGrouping as any;

  constructor(private csvScatterService: CsvScatterService) {
  }

  chartOptionsScatterYear: any = {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
    },
    title: {
      text: '',
    },
    plotOptions: {
      scatter: {
        lineWidth: 0,
        marker: {
          radius: 4.5,
          symbol: 'circle',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        }
      }
    },
    series: [{}]
  };

  chartOptionsScatterSeason: any = {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
    },
    title: {
      text: '',
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 4.5,
          symbol: 'circle',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        }
      }
    },
    series: [{}]
  };

  updatedChart(xAxis: Source, yAxis: Source) {
    this.flag = this.scatterXAxis === this.scatterYAxis;
    if (!this.flag && this.scatterGrouping === ScatterGrouping.season) {
      this.internalScatterGrouping = ScatterGrouping.season;
      this.updatedChartForSeason(xAxis, yAxis);
    } else if (!this.flag && this.scatterGrouping === ScatterGrouping.year) {
      this.internalScatterGrouping = ScatterGrouping.year;
      this.updatedChartForYear(xAxis, yAxis);
    }
  }

  setLine(width: number) {
    if (this.internalScatterGrouping === ScatterGrouping.season) {
      this.chartOptionsScatterSeason.plotOptions.scatter.lineWidth = width;
      this.updateFlagBigScatterSeason = true;
    }
    else if (this.internalScatterGrouping === ScatterGrouping.year) {
      this.chartOptionsScatterYear.plotOptions.scatter.lineWidth = width;
      this.updateFlagBigScatterYear = true;
    }
  }

  private updatedChartForSeason(xAxis: Source, yAxis: Source) {
    this.chartOptionsScatterSeason.series[0] = {
      name: 'Winter',
      color: '#7570b3',
      data: this.csvScatterService.winter,
    }
    this.chartOptionsScatterSeason.series[1] = {
      name: 'Spring',
      color: '#66a61e',
      data: this.csvScatterService.spring,
    }
    this.chartOptionsScatterSeason.series[2] = {
      name: 'Summer',
      color: '#e6ab02',
      data: this.csvScatterService.summer,
    }
    this.chartOptionsScatterSeason.series[3] = {
      name: 'Autumn',
      color: '#e7298a',
      data: this.csvScatterService.autumn,
    }

    const xAxisUnit = xAxis === Source.cw ? '' : 'kWh';
    this.chartOptionsScatterSeason.xAxis = {
      title: {
        text: xAxis.toString()
      },
      type: 'number',
      labels: {
        format: '{value} ' + xAxisUnit
      },
    }
    if (yAxis === Source.cw) {
      this.chartOptionsScatterYear.yAxis = {
        title: {
          text: yAxis.toString()
        },
        type: 'number',
      }
    } else {
      this.chartOptionsScatterYear.yAxis = {
        labels: {
          format: '{value} kWh'
        },
        title: {
          text: yAxis.toString()
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      }
    }
    this.chartOptionsScatterSeason.tooltip = {
      formatter: function (): string {
        // @ts-ignore
        return xAxis + ': <b>' + this.x + (xAxis === Source.cw ? '' : 'kWh') + '</b> <br/>' + yAxis + ': <b>' + this.y + (xAxis === Source.cw ? '' : 'kWh') + '</b>'
      }
    }

    this.updateFlagBigScatterSeason = true;
  }

  private updatedChartForYear(xAxis: Source, yAxis: Source) {
    this.chartOptionsScatterYear.series[0] = {
      name: '2015',
      color: '#a6cee3',
      data: this.csvScatterService.year2015,
    }
    this.chartOptionsScatterYear.series[1] = {
      name: '2016',
      color: '#1f78b4',
      data: this.csvScatterService.year2016,
    }
    this.chartOptionsScatterYear.series[2] = {
      name: '2017',
      color: '#b2df8a',
      data: this.csvScatterService.year2017,
    }
    this.chartOptionsScatterYear.series[3] = {
      name: '2018',
      color: '#33a02c',
      data: this.csvScatterService.year2018,
    }
    this.chartOptionsScatterYear.series[4] = {
      name: '2019',
      color: '#fb9a99',
      data: this.csvScatterService.year2019,
    }
    this.chartOptionsScatterYear.series[5] = {
      name: '2020',
      color: '#e31a1c',
      data: this.csvScatterService.year2020,
    }
    this.chartOptionsScatterYear.series[6] = {
      name: '2021',
      color: '#fdbf6f',
      data: this.csvScatterService.year2021,
      xAxis: xAxis === Source.cw ? 1 : 0,
    }
    this.chartOptionsScatterYear.series[7] = {
      name: '2022',
      color: '#ff7f00',
      data: this.csvScatterService.year2022,
    }

    if (xAxis === Source.cw) {
      this.chartOptionsScatterYear.xAxis = [{
        title: {
          text: xAxis.toString()
        },
        type: 'number',
      }, {
        title: {
          text: ''
        },
        categories: ['January','January','January','January','January','February','February','February','February','March','March','March','March','April','April','April','April','May','May','May','May','May','June','June','June','June','July','July','July','July','July','August','August','August','August','September','September','September','September','October','October','October','October','October','November','November','November','November','December','December','December','December',''],
        tickInterval: 4
      }]
    } else {
      this.chartOptionsScatterYear.xAxis = [{
        title: {
          text: xAxis.toString()
        },
        type: 'number',
        labels: {
          format: '{value} kWh'
        },
      }]
    }
    if (yAxis === Source.cw) {
      this.chartOptionsScatterYear.yAxis = [{
        title: {
          text: yAxis.toString()
        },
        type: 'number',
      }]
    } else {
      this.chartOptionsScatterYear.yAxis = [{
        labels: {
          format: '{value} kWh'
        },
        title: {
          text: yAxis.toString()
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      }]
    }
    this.chartOptionsScatterYear.tooltip = {
      formatter: function (): string {
        // @ts-ignore
        return xAxis + ': <b>' + this.x + (xAxis === Source.cw ? '' : 'kWh') + '</b> <br/>' + yAxis + ': <b>' + this.y + (xAxis === Source.cw ? '' : 'kWh') + '</b>'
      }
    }

    this.updateFlagBigScatterYear = true;
  }
}


