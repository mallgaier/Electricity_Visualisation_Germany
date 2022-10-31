import {Injectable} from "@angular/core";
import * as Highcharts from "highcharts";
import {CsvService} from "./csv.service";
import {ColourService} from "./colour.service";

@Injectable({
  providedIn: 'root',
})
export class ChartService {


  constructor(private csvService: CsvService, private colourService: ColourService) {
  }

  // Global Chart Settings
  chartOptions: any = {
    chart: {
      type: 'area',
      zoomType: 'x',
    },
    xAxis: {
      title: {
        text: 'Date'
      },
      type: 'datetime',
      timezone: 'Europe/Berlin'
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
      // headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>',
      headerFormat: '<span style="font-size:12px"><b>{point.x}</b></span><br>',
      xDateFormat: '%A %d.%m.%Y %k:%M'
    },
    plotOptions: {
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
  };

  updateDetailedChart() {
    this.chartOptions.xAxis = [{
     type: 'datetime',
      // tickInterval: 96, //96 672
   /* timezone: 'Europe/Berlin',
     pointStart: Highcharts.dateFormat('%A %d.%m.%Y %k:%M',this.csvService.datetime[100]),
     pointInterval: 24 * 365, */
    categories: this.csvService.datetime.map(date => {
        return Highcharts.dateFormat('%A', date + 7200000); //;%A %d.%m.%Y %k:%M
      })
    }]
    this.chartOptions.colors = [
      this.colourService.hydroPumpedStorage,
      this.colourService.hydroPumpedStorage,
      this.colourService.photovoltaics,
      this.colourService.windOffshore,
      this.colourService.windOnshore,
      this.colourService.biomass,
      this.colourService.hydroPower,
      this.colourService.otherRenewables,
      this.colourService.fossilGas,
      this.colourService.nuclear,
      this.colourService.brownCoal,
      this.colourService.hardCoal,
      this.colourService.otherConventional,
      this.colourService.totalDemand
    ]

    this.chartOptions.series = [{
      name: 'Hydro Pumped Storage',
      data: this.csvService.hydroPumpedStorage
    }, {
      name: 'Photovoltaics',
      data: this.csvService.photovoltaics
    }, {
      name: 'Wind Offshore',
      data: this.csvService.windOffshore
    }, {
      name: 'Wind Onshore',
      data: this.csvService.windOnshore
    }, {
      name: 'Biomass',
      data: this.csvService.biomass
    }, {
      name: 'Hydro Power',
      data: this.csvService.hydropower
    }, {
      name: 'other Renewables',
      data: this.csvService.otherRenewable
    }, {
      name: 'Fossil Gas',
      data: this.csvService.fossilGas
    }, {
      name: 'Nuclear',
      data: this.csvService.nuclear
    }, {
      name: 'Brown Coal',
      data: this.csvService.brownCcoal
    }, {
      name: 'Hard Coal',
      data: this.csvService.hardCoal
    }, {
      name: 'other Conventional',
      data: this.csvService.otherConventional
    }, {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }]
  }

  updateSummarizedChart() {
   /* this.chartOptions.xAxis = [{
      categories: this.csvService.datetime.map(date => {
        return Highcharts.dateFormat('%A %d.%m.%Y %k:%M', new Date(date).getTime());
      })
    }]*/
    this.chartOptions.colors = [
      this.colourService.sumRenewables,
      this.colourService.sumConventional,
      this.colourService.totalDemand
    ]
    this.chartOptions.series = [{
      name: 'Sum Renewables',
      data: this.csvService.sumRenewable
    }, {
      name: 'Sum Conventional',
      data: this.csvService.sumConventional
    }, {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }]
  }

}
