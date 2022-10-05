import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import {AppService} from "./app.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DaVis_Electricity_Production_Germany';
  public updateFlagBig = false;
  public chartRef!: Highcharts.Chart;

  highchartBig: typeof Highcharts = Highcharts;
  chartOptions: any = {
    chart: {
      type: 'area',
      zoomType: 'x',
    },
    title: {
      text: 'Greenhouse gases from Norwegian economic activity'
    },
    subtitle: {
      text: 'Source: ' +
        '<a href="https://www.ssb.no/en/statbank/table/09288/"' +
        'target="_blank">SSB</a>'
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'MWh'
      }
    },
    tooltip: {
      shared: true,
      headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
    },
    plotOptions: {
      series: {
        pointStart: 2015
        //pointInterval: 3600 * 100
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
    series: []
    /* , {
       name: 'Agriculture and hunting',
       data: [4752, 4820, 4877, 4925, 5006, 4976, 4946, 4911, 4913]
     }, {
       name: 'Air transport',
       data: [3164, 3541, 3898, 4115, 3388, 3569, 3887, 4593, 1550]

     }, {
       name: 'Construction',
       data: [2019, 2189, 2150, 2217, 2175, 2257, 2344, 2176, 2186]
     }]*/
  };

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.initCSV('assets/testData.csv');
  }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  updateGraph(): void {
    this.chartOptions.series = [{
      name: 'Biomass',
      data: this.appService.biomass
    }, {
      name: 'Nuclear',
      data: this.appService.hydropower
    }, {
      name: 'Wind Offshore',
      data: this.appService.windOffshore
    }, {
      name: 'Wind Onshore',
      data: this.appService.windOnshore
    }, {
      name: 'Photovoltaics',
      data: this.appService.photovoltaics
    }, {
      name: 'other Renewables',
      data: this.appService.otherRenewable
    }, {
      name: 'Nuclear',
      data: this.appService.nuclear
    }, {
      name: 'Brown Coal',
      data: this.appService.brownCcoal
    }, {
      name: 'Hard Coal',
      data: this.appService.hardCoal
    }, {
      name: 'Fossil Gas',
      data: this.appService.fossilGas
    }, {
      name: 'Hydro Pumped Storage',
      data: this.appService.hydroPumpedStorage
    }, {
      name: 'other Coventional',
      data: this.appService.otherConventional
    }, {
      name: 'total Grid load',
      type: 'line',
      data: this.appService.totalGridLoad
    }]
    this.updateFlagBig = true;
  }
}
