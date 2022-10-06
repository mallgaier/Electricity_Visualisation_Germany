import {Injectable} from "@angular/core";
import * as Highcharts from "highcharts";
import {CsvService} from "./csv.service";

@Injectable({
  providedIn: 'root',
})
export class ChartService {


  constructor(private csvService: CsvService) {
  }

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

  updateChartDetailed() {
    this.chartOptions.xAxis = [{
      categories: this.csvService.datetime.map(date => {
        return Highcharts.dateFormat('%Y-%m-%d', new Date(date).getTime());
      })
    }]
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
      name: 'other Coventional',
      data: this.csvService.otherConventional
    }, {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }]
  }

  updateChartNondetailed() {
    this.chartOptions.xAxis = [{
      categories: this.csvService.datetime.map(date => {
        return Highcharts.dateFormat('%Y-%m-%d', new Date(date).getTime());
      })
    }]
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
