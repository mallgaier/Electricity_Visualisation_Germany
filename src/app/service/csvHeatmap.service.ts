import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Source} from "./enum.service";

@Injectable({
  providedIn: 'root',
})
export class CsvHeatmapService {

  //Aggregated values
  public heatmap: number[][] = [];
  public minHydroPumpedStorageCombined = 0;
  public maxHydroPumpedStorageCombined = 0;
  private day = 0;
  private weekdayNumeric = 0;
  private weekdayArray: number[] = [];

  private Sunday: number[] = [];
  private Monday: number[] = [];
  private Tuesday: number[] = [];
  private Wednesday: number[] = [];
  private Thursday: number[] = [];
  private Friday: number[] = [];
  private Saturday: number[] = [];


  constructor(private http: HttpClient) {
  }

  async updateCSVAndAggregatedValues(url: string, source: Source): Promise<boolean> {
    const index1 = this.sourceToCollumn(source);
    if (index1 != 99) {
      this.updateCSV(url, index1);
    } else {
      switch (source) {
        case Source.coal:
          await this.updateCSVGrouped(url, 8, 9);
          break;
        case Source.other:
          await this.updateCSVGrouped(url, 6, 12);
          break;
        case Source.wind:
          await this.updateCSVGrouped(url, 3, 4);
          break;
        case Source.hydroPumpedStorage:
          await this.updateCSVForHydroPumpedStorageCombined(url);
          break;
      }
    }
    return true;
  }

  async updateCSV(url: string, index1: number): Promise<boolean> {
    this.initArrays();
    this.http.get(url, {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          // Index 1 due to header
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(";");

            // If the row is shorter than the length of a date -> aboard parsing
            if (row.length < 17) {
              break;
            }
            // 2019-04-01
            if (Number(row[0].substring(8, 10)) !== this.day) {
              if (this.day !== 0) {
                this.transferArray();
              }
              this.weekdayNumeric = new Date(row[0].substring(0, 10)).getDay();
              this.day++;
            }
            this.weekdayArray.push(Math.round((Number(row[index1]) / Number(row[13])) * 100));
          }
        },
        error => {
          console.log(error);
          return false;
        },
        () => {
          this.transferArray();
          this.combineArray()
        }
      );
    return true;
  }

  async updateCSVGrouped(url: string, index1: number, index2: number): Promise<boolean> {
    this.initArrays();
    this.http.get(url, {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          // Index 1 due to header
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(";");

            // If the row is shorter than the length of a date -> aboard parsing
            if (row.length < 17) {
              break;
            }
            // 2019-04-01
            if (Number(row[0].substring(8, 10)) !== this.day) {
              if (this.day !== 0) {
                this.transferArray();
              }
              this.weekdayNumeric = new Date(row[0].substring(0, 10)).getDay();
              this.day++;
            }
            this.weekdayArray.push(Math.round(((Number(row[index1]) + Number(row[index2])) / Number(row[13])) * 100));
          }
        },
        error => {
          console.log(error);
          return false;
        },
        () => {
          this.transferArray();
          this.combineArray()
        }
      );
    return true;
  }

  async updateCSVForHydroPumpedStorageCombined(url: string): Promise<boolean> {
    this.initArrays();
    this.minHydroPumpedStorageCombined = 0;
    this.maxHydroPumpedStorageCombined = 0;
    this.http.get(url, {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          // Index 1 due to header
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(";");

            // If the row is shorter than the length of a date -> aboard parsing
            if (row.length < 17) {
              break;
            }
            // 2019-04-01
            if (Number(row[0].substring(8, 10)) !== this.day) {
              if (this.day !== 0) {
                this.transferArray();
              }
              this.weekdayNumeric = new Date(row[0].substring(0, 10)).getDay();
              this.day++;
            }
            const value = ((Number(row[2]) - Number(row[15])) / Number(row[13]));
            if (this.minHydroPumpedStorageCombined > value) {
              this.minHydroPumpedStorageCombined = value;
            }
            if (this.maxHydroPumpedStorageCombined < value) {
              this.maxHydroPumpedStorageCombined = value;
            }
            this.weekdayArray.push(Math.round(value * 100));
          }
        },
        error => {
          console.log(error);
          return false;
        },
        () => {
          this.minHydroPumpedStorageCombined = Math.round(this.minHydroPumpedStorageCombined * 100);
          this.maxHydroPumpedStorageCombined = Math.round(this.maxHydroPumpedStorageCombined * 100);
          this.transferArray();
          this.combineArray();
        }
      );
    return true;
  }

  private transferArray(): void {
    switch (this.weekdayNumeric) {
      case 0:
        for (let i = 0; i < this.weekdayArray.length; i++) {
          this.Sunday[i] = Math.round(((this.Sunday[i] + this.weekdayArray[i]) / 2) * 100) / 100;
        }
        break;
      case 1:
        for (let i = 0; i < this.weekdayArray.length; i++) {
          this.Monday[i] = Math.round(((this.Monday[i] + this.weekdayArray[i]) / 2) * 100) / 100;
        }
        break;
      case 2:
        for (let i = 0; i < this.weekdayArray.length; i++) {
          this.Tuesday[i] = Math.round(((this.Tuesday[i] + this.weekdayArray[i]) / 2) * 100) / 100;
        }
        break;
      case 3:
        for (let i = 0; i < this.weekdayArray.length; i++) {
          this.Wednesday[i] = Math.round(((this.Wednesday[i] + this.weekdayArray[i]) / 2) * 100) / 100;
        }
        break;
      case 4:
        for (let i = 0; i < this.weekdayArray.length; i++) {
          this.Thursday[i] = Math.round(((this.Thursday[i] + this.weekdayArray[i]) / 2) * 100) / 100;
        }
        break;
      case 5:
        for (let i = 0; i < this.weekdayArray.length; i++) {
          this.Friday[i] = Math.round(((this.Friday[i] + this.weekdayArray[i]) / 2) * 100) / 100;
        }
        break;
      case 6:
        for (let i = 0; i < this.weekdayArray.length; i++) {
          this.Saturday[i] = Math.round(((this.Saturday[i] + this.weekdayArray[i]) / 2) * 100) / 100;
        }
        break;
    }
    this.weekdayArray = [];
  }

  private combineArray(): void {
    for (let time = 0; time < this.Monday.length; time++) {
      const numberArray: number[] = [time, 0, this.Monday[time]];
      this.heatmap.push(numberArray);
    }
    for (let time = 0; time < this.Tuesday.length; time++) {
      const numberArray: number[] = [time, 1, this.Tuesday[time]];
      this.heatmap.push(numberArray);
    }
    for (let time = 0; time < this.Wednesday.length; time++) {
      const numberArray: number[] = [time, 2, this.Wednesday[time]];
      this.heatmap.push(numberArray);
    }
    for (let time = 0; time < this.Thursday.length; time++) {
      const numberArray: number[] = [time, 3, this.Thursday[time]];
      this.heatmap.push(numberArray);
    }
    for (let time = 0; time < this.Friday.length; time++) {
      const numberArray: number[] = [time, 4, this.Friday[time]];
      this.heatmap.push(numberArray);
    }
    for (let time = 0; time < this.Saturday.length; time++) {
      const numberArray: number[] = [time, 5, this.Saturday[time]];
      this.heatmap.push(numberArray);
    }
    for (let time = 0; time < this.Sunday.length; time++) {
      const numberArray: number[] = [time, 6, this.Sunday[time]];
      this.heatmap.push(numberArray);
    }
  }

  private initArrays(): void {
    this.day = 0;
    this.weekdayArray = [];
    this.heatmap = [];
    this.Sunday = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.Monday = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.Tuesday = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.Wednesday = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.Thursday = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.Friday = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.Saturday = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  public sourceToCollumn(source: Source): number {
    switch (source) {
      case Source.hydroPumpedStorage:
        return 99;
      case Source.hydroPower:
        return 2;
      case Source.windOffshore:
        return 3;
      case Source.windOnshore:
        return 4;
      case Source.wind:
        return 99;
      case Source.nuclear:
        return 7;
      case Source.fossilGas :
        return 10;
      case Source.other :
        return 99;
      case Source.biomass:
        return 1;
      case Source.photovoltaics :
        return 5;
      case Source.brownCoal:
        return 8;
      case Source.hardCoal :
        return 9;
      case Source.coal :
        return 99;
      default: return 99;
    }

  }
}
