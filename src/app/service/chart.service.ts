import {Injectable} from "@angular/core";
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
      // timezone: 'Europe/Berlin',
      // dateTimeLabelFormats: '%A %d.%m.%Y %k:%M',
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
        //2017-04-01T01:15:00
       // pointStart: Date.UTC(2000, 1,1),
        // Number(this.csvService.datetime[0].substring(5, 7)) - 1, 1), //Date.UTC(2022, 7, 1),
        // Date(this.csvService.datetime[0]),//Date.UTC(2010, 1, 9),
        // pointInterval: 15 * 60 * 1000,
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
  };

  updateDetailedChart(monthNumeric: number, yearNumeric: number) {
    /* this.chartOptions.xAxis = [{
      type: 'datetime',
       // tickInterval: 96, //96 672
    /!* timezone: 'Europe/Berlin',
      pointStart: Highcharts.dateFormat('%A %d.%m.%Y %k:%M',this.csvService.datetime[100]),
      pointInterval: 24 * 365, *!/
     categories: this.csvService.datetime.map(date => {
         return Highcharts.dateFormat('%A', date + 7200000); //;%A %d.%m.%Y %k:%M
       })
     }]*/
  if (monthNumeric === 0) {
      this.chartOptions.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptions.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptions.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptions.plotOptions.series.pointInterval = 15 * 60 * 1000
    }

    this.chartOptions.colors = [
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
    this.chartOptions.series[0] = {
      name: 'Hydro Pumped Storage',
      type: 'area',
      data: this.csvService.hydroPumpedStorage
    }
    this.chartOptions.series[1] = {
      name: 'Photovoltaics',
      type: 'area',
      data: this.csvService.photovoltaics
    }
    this.chartOptions.series[2] = {
      name: 'Wind Offshore',
      type: 'area',
      data: this.csvService.windOffshore

    }
    this.chartOptions.series[3] = {
      name: 'Wind Onshore',
      type: 'area',
      data: this.csvService.windOnshore
    }
    this.chartOptions.series[4] = {
      name: 'Biomass',
      type: 'area',
      data: this.csvService.biomass
    }
    this.chartOptions.series[5] = {
      name: 'Hydro Power',
      type: 'area',
      data: this.csvService.hydropower
    }
    this.chartOptions.series[6] = {
      name: 'other Renewables',
      type: 'area',
      data: this.csvService.otherRenewable
    }
    this.chartOptions.series[7] = {
      name: 'Fossil Gas',
      type: 'area',
      data: this.csvService.fossilGas
    }
    this.chartOptions.series[8] = {
      name: 'Nuclear',
      type: 'area',
      data: this.csvService.nuclear
    }
    this.chartOptions.series[9] = {
      name: 'Brown Coal',
      type: 'area',
      data: this.csvService.brownCcoal
    }
    this.chartOptions.series[10] = {
      name: 'Hard Coal',
      type: 'area',
      data: this.csvService.hardCoal
    }
    this.chartOptions.series[11] = {
      name: 'other Conventional',
      type: 'area',
      data: this.csvService.otherConventional
    }
    this.chartOptions.series[12] = {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }
  }

  updateGroupedChart(monthNumeric: number, yearNumeric: number) {
    this.chartOptions.colors = [
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
    this.chartOptions.series[0] = {
      name: 'Hydro Pumped Storage',
      type: 'area',
      data: this.csvService.hydroPumpedStorage
    }
    this.chartOptions.series[1] = {
      name: 'Photovoltaics',
      type: 'area',
      data: this.csvService.photovoltaics
    }
    this.chartOptions.series[2] = {
      name: 'Wind Offshore',
      type: 'area',
      data: this.csvService.windOffshore

    }
    this.chartOptions.series[3] = {
      name: 'Wind Onshore',
      type: 'area',
      data: this.csvService.windOnshore
    }
    this.chartOptions.series[4] = {
      name: 'Biomass',
      type: 'area',
      data: this.csvService.biomass
    }
    this.chartOptions.series[5] = {
      name: 'Hydro Power',
      type: 'area',
      data: this.csvService.hydropower
    }
    this.chartOptions.series[6] = {
      name: 'other Renewables',
      type: 'area',
      data: this.csvService.otherRenewable
    }
    this.chartOptions.series[7] = {
      name: 'Fossil Gas',
      type: 'area',
      data: this.csvService.fossilGas
    }
    this.chartOptions.series[8] = {
      name: 'Nuclear',
      type: 'area',
      data: this.csvService.nuclear
    }
    this.chartOptions.series[9] = {
      name: 'Brown Coal',
      type: 'area',
      data: this.csvService.brownCcoal
    }
    this.chartOptions.series[10] = {
      name: 'Hard Coal',
      type: 'area',
      data: this.csvService.hardCoal
    }
    this.chartOptions.series[11] = {
      name: 'other Conventional',
      type: 'area',
      data: this.csvService.otherConventional
    }
    this.chartOptions.series[12] = {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }

    if (monthNumeric === 0) {
      this.chartOptions.plotOptions.series.pointStart = Date.UTC(yearNumeric, 0, 1)
      this.chartOptions.plotOptions.series.pointInterval = 6 * 60 * 60 * 1000
    } else {
      this.chartOptions.plotOptions.series.pointStart = Date.UTC(yearNumeric, monthNumeric - 1, 1)
      this.chartOptions.plotOptions.series.pointInterval = 15 * 60 * 1000
    }
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
    this.chartOptions.series[0] = {
      name: 'Sum Renewables',
      data: this.csvService.sumRenewable
    }
    this.chartOptions.series[1] = {
      name: 'Sum Conventional',
      data: this.csvService.sumConventional
    }
    this.chartOptions.series[2] = {
      name: 'total Grid load',
      type: 'line',
      data: this.csvService.totalGridLoad
    }

    /*this.chartOptions.series[1] = {
      type: 'line',
      data: this.data.reverse()
    }*/
  }

}
