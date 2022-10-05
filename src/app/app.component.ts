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
      dateTimeLabelFormats: {
        day: '%e %b %y',
      },
      title: {
        text: 'Date'
      },
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'MWh'
      }
    }
    ,
    tooltip: {
      shared: true,
      headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
    }
    ,
    plotOptions: {
      series: {
        pointStart: 2021,
        pointInterval: 3600 * 100
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
    }
    ,
    series: []
  };

  constructor(private appService: AppService
  ) {
  }

  ngOnInit()
    :
    void {
    this.appService.initCSV('assets/testData.csv');
  }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  updateGraph(): void {
    this.chartOptions.xAxis = [{
      categories: this.appService.datetime.map(date => {
        return Highcharts.dateFormat('%Y-%m-%d', new Date(date).getTime());
      })
    }]
    this.chartOptions.series = [{
      name: 'Hydro Pumped Storage',
      data: this.appService.hydroPumpedStorage
    }, {
      name: 'Photovoltaics',
      data: this.appService.photovoltaics
    }, {
      name: 'Wind Offshore',
      data: this.appService.windOffshore
    }, {
      name: 'Wind Onshore',
      data: this.appService.windOnshore
    }, {
      name: 'Biomass',
      data: this.appService.biomass
    }, {
      name: 'Hydro Power',
      data: this.appService.hydropower
    }, {
      name: 'other Renewables',
      data: this.appService.otherRenewable
    }, {
      name: 'Fossil Gas',
      data: this.appService.fossilGas
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
