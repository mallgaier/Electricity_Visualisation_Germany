import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ScatterGrouping, Source, Year} from "./enum.service";

@Injectable({
  providedIn: 'root',
})
export class CsvScatterService {

  //Time-series arrays
  public year2015: number[][] = [];
  public year2016: number[][] = [];
  public year2017: number[][] = [];
  public year2018: number[][] = [];
  public year2019: number[][] = [];
  public year2020: number[][] = [];
  public year2021: number[][] = [];
  public year2022: number[][] = [];

  // Season data
  public winter: number[][] = [];
  public spring: number[][] = [];
  public summer: number[][] = [];
  public autumn: number[][] = [];

  constructor(private http: HttpClient) {
  }

  async updateCSVAndMatrix(grouped: ScatterGrouping, year: Year, dataResolution: ScatterGrouping, xAxis: Source, yAxis: Source): Promise<boolean> {
    const url = this.toUrl(year, dataResolution);

    let xArray = [0, 0];
    let yArray = [0, 0];
    if (dataResolution === ScatterGrouping.weekly) {
      xArray = this.SourceIndex(xAxis);
      yArray = this.SourceIndex(yAxis);
    } else if (dataResolution === ScatterGrouping.daily) {
      xArray = this.SourceIndexDaily(xAxis);
      yArray = this.SourceIndexDaily(yAxis);
    }

    return this.readWeeklyCSV(url, xArray[0], xArray[1] === 99 ? undefined : xArray[1], yArray[0], yArray[1] === 99 ? undefined : yArray[1], dataResolution, grouped, year);
  }

  async readWeeklyCSV(url: string, rowX: number, rowX2: number | undefined, rowY: number, rowY2: number | undefined, dataResolution: ScatterGrouping, grouped: ScatterGrouping, yearEnum: Year) {
    this.initArrays();
    this.http.get(url, {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          // Index 1 due to header
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            // If the row is shorter than the length of a date -> aboard parsing
            if (row.length < 17) {
              break;
            }
            let cw = 0;
            let year = 0;
            if (dataResolution === ScatterGrouping.weekly) {
              cw = Number(row[0]);
              year = Number(row[19]);
            } else if (dataResolution === ScatterGrouping.daily) {
              cw = Number(row[18]);
            }
            if (yearEnum === Year.yAll) {
              if (dataResolution === ScatterGrouping.weekly) {
                year = Number(row[19]);
              } else if (dataResolution === ScatterGrouping.daily) {
                year = Number(row[0].substring(6, 10));
              }
            }

            let x;
            if (rowX2) {
              x = Math.round(Number(row[rowX])) + Math.round(Number(row[rowX2]));
            } else if (rowX === 60) {
              x = index;
            } else {
              x = Math.round(Number(row[rowX]));
            }
            let y;
            if (rowY2) {
              y = Math.round(Number(row[rowY])) + Math.round(Number(row[rowY2]));
            } else if (rowY === 60) {
              y = index;
            } else {
              y = Math.round(Number(row[rowY]));
            }

            if (grouped === ScatterGrouping.season) {
              if (cw <= 11 || cw >= 51)
                this.winter.push([x, y]);
              else if (cw <= 24)
                this.spring.push([x, y]);
              else if (cw <= 37)
                this.summer.push([x, y]);
              else if (cw <= 50)
                this.autumn.push([x, y]);
            } else if (grouped === ScatterGrouping.year) {
              switch (year) {
                case 2015:
                  this.year2015.push([x, y]);
                  break;
                case 2016:
                  this.year2016.push([x, y]);
                  break;
                case 2017:
                  this.year2017.push([x, y]);
                  break;
                case 2018:
                  this.year2018.push([x, y]);
                  break;
                case 2019:
                  this.year2019.push([x, y]);
                  break;
                case 2020:
                  this.year2020.push([x, y]);
                  break;
                case 2021:
                  this.year2021.push([x, y]);
                  break;
                case 2022:
                  this.year2022.push([x, y]);
                  break;

              }
            }
          }

        },
        error => {
          console.log(error);
          return false;
        },
        () => {
          return true;
        }
      );
    return false;
  }


  private initArrays(): void {
    this.year2015 = [];
    this.year2016 = [];
    this.year2017 = [];
    this.year2018 = [];
    this.year2019 = [];
    this.year2020 = [];
    this.year2021 = [];
    this.year2022 = [];
    this.winter = [];
    this.spring = [];
    this.summer = [];
    this.autumn = [];
  }

  private SourceIndex(axis: Source): [number, number] {
    let rowX: number;
    let rowX2 = 99;
    if (axis === Source.other) {
      rowX = 6;
      rowX2 = 12;
    } else if (axis === Source.coal) {
      rowX = this.SourceToColumn(Source.brownCoal);
      rowX2 = this.SourceToColumn(Source.hardCoal);
    } else if (axis === Source.hydroPowerCombined) {
      rowX = this.SourceToColumn(Source.hydroPower);
      rowX2 = this.SourceToColumn(Source.hydroPumpedStorage);
    } else if (axis === Source.wind) {
      rowX = this.SourceToColumn(Source.windOffshore);
      rowX2 = this.SourceToColumn(Source.windOnshore);
    } else if (axis === Source.sumGeneration) {
      rowX = this.SourceToColumn(Source.sumConventional);
      rowX2 = this.SourceToColumn(Source.sumGeneration);
    } else {
      rowX = this.SourceToColumn(axis);
    }
    return [rowX, rowX2];
  }

  private SourceToColumn(source: Source): number {
    switch (source) {
      case Source.cw:
        return 0;
      case Source.biomass:
        return 1;
      case Source.hydroPower:
        return 2;
      case Source.windOffshore:
        return 3;
      case Source.windOnshore:
        return 4;
      case Source.solar:
        return 5;
      case Source.nuclear:
        return 7;
      case Source.brownCoal:
        return 8;
      case Source.hardCoal:
        return 9;
      case Source.fossilGas:
        return 10;
      case Source.hydroPumpedStorage:
        return 11;
      case Source.totalGridLoad:
        return 13;
      case Source.residualLoad:
        return 14;
      case Source.sumConventional:
        return 16;
      case Source.sumRenewable:
        return 17;
      case Source.netExport:
        return 18;
      case Source.date:
        return 60;
      default:
        return 0;
    }
  }

  private SourceIndexDaily(axis: Source): [number, number] {
    let rowX: number;
    let rowX2 = 99;
    if (axis === Source.other) {
      rowX = 6;
      rowX2 = 12;
    } else if (axis === Source.coal) {
      rowX = this.SourceToColumnDaily(Source.brownCoal);
      rowX2 = this.SourceToColumnDaily(Source.hardCoal);
    } else if (axis === Source.hydroPowerCombined) {
      rowX = this.SourceToColumnDaily(Source.hydroPower);
      rowX2 = this.SourceToColumnDaily(Source.hydroPumpedStorage);
    } else if (axis === Source.wind) {
      rowX = this.SourceToColumnDaily(Source.windOffshore);
      rowX2 = this.SourceToColumnDaily(Source.windOnshore);
    } else if (axis === Source.sumGeneration) {
      rowX = this.SourceToColumnDaily(Source.sumConventional);
      rowX2 = this.SourceToColumnDaily(Source.sumGeneration);
    } else {
      rowX = this.SourceToColumnDaily(axis);
    }
    return [rowX, rowX2];
  }

  private SourceToColumnDaily(source: Source): number {
    switch (source) {
      case Source.cw:
        return 18;
      case Source.biomass:
        return 1;
      case Source.hydroPower:
        return 2;
      case Source.windOffshore:
        return 3;
      case Source.windOnshore:
        return 4;
      case Source.solar:
        return 5;
      case Source.nuclear:
        return 7;
      case Source.brownCoal:
        return 8;
      case Source.hardCoal:
        return 9;
      case Source.fossilGas:
        return 10;
      case Source.hydroPumpedStorage:
        return 11;
      case Source.totalGridLoad:
        return 13;
      case Source.residualLoad:
        return 14;
      case Source.sumConventional:
        return 16;
      case Source.sumRenewable:
        return 17;
      case Source.netExport:
        return 20;
      case Source.date:
        return 60;
      default:
        return 0;
    }
  }

  private toUrl(year: Year, dataResolution: ScatterGrouping): string {
    let url = '';
    if (dataResolution === ScatterGrouping.daily) {
      url = 'assets/' + year + '_daily.csv';
    } else if (dataResolution === ScatterGrouping.weekly) {
      if (year === Year.yAll)
        url = 'assets/year_weekly.csv';
      else
        url = 'assets/' + year + '_weekly.csv';
    }
    return url;
  }
}
