import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import {CsvService} from "./service/csv.service";
import {EnumService, Month, Year} from './service/enum.service';
import {faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  // Select Options
  public Month = Month;
  public Year = Year;
  public displayMonth = Month.Year;
  public displayYear = Year.y2022;
  public displayDetail = true;

  // Displayed values
  public percentageConventional = 0;
  public percentageRenewable = 0;
  public nextMonth: string | undefined;
  public previousMonth: string | undefined;

  // Icons
  public faArrowRight = faArrowRight;
  public faArrowLeft = faArrowLeft;

  // Chart
  highchartBig: typeof Highcharts = Highcharts;
  public updateFlagBig = false;
  public chartRef!: Highcharts.Chart;
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

  constructor(private csvService: CsvService, public enumService: EnumService) {
  }

  ngOnInit(): void {
    this.csvService.initCSV('assets/testData.csv');
  }

  setDisplayMonth(value: Month) {
    return this.displayMonth = value;
  }

  setDisplayYear(value: Year) {
    return this.displayYear = value;
  }

  setDisplayDetail(detail: boolean) {
    this.displayDetail = detail;
  }

  calculatePercentageConventionalRenewable() {
    const sumConventional = this.csvService.sumConventional.reduce((partialSum, a) => partialSum + a, 0);
    const sumRenewable = this.csvService.sumRenewable.reduce((partialSum, a) => partialSum + a, 0);
    this.percentageConventional = Math.round(sumConventional / (sumRenewable + sumConventional) * 100);
    this.percentageRenewable = Math.round(sumRenewable / (sumRenewable + sumConventional) * 100);
  }

  calculateNextPreviousMonth() {
    this.previousMonth = this.enumService.getPreviousMonth(this.displayMonth, this.displayYear);
    this.nextMonth = this.enumService.getNextMonth(this.displayMonth, this.displayYear);
  }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  updateData(): void {
    this.csvService.initCSV(this.enumService.enumToFileName(this.displayMonth, this.displayYear));
  }

  updateGraph(): void {
    this.calculatePercentageConventionalRenewable();
    this.calculateNextPreviousMonth();

    if (this.displayDetail) {
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
    } else {
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
    this.updateFlagBig = true;
  }
}
