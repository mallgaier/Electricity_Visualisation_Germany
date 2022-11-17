import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CsvScatterService {

  //Time-series arrays
  public priceExport1: number[][] = [];
  public priceExport2: number[][] = [];
  public priceExport3: number[][] = [];
  public priceExport4: number[][] = [];
  public priceExport5: number[][] = [];

  constructor(private http: HttpClient) {
  }

  async updateCSVAndMatrix(url: string): Promise<boolean> {
    return this.updateCSV(url);
  }

  async updateCSV(url: string): Promise<boolean> {
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
            const hour = new Date(row[0]).getHours();

            // dayAheadPrice 18 - dayAheadNeighbourPrice 19
            const netExport = Math.round(Number(row[20]));
            let price: number;
            if (netExport > 5) {
              price = Math.round((Number(row[19]) - Number(row[18])) * 100) / 100;
            } else if (netExport < -5) {
              price = Math.round((Number(row[18]) - Number(row[19])) * 100) / 100;
            }
            if (hour <= 3) {
              this.priceExport1.push([netExport,price!]);
            } else if (hour <= 8) {
              this.priceExport2.push([netExport,price!]);
            } else if (hour <= 12) {
              this.priceExport3.push([netExport,price!]);
            } else if (hour <= 16) {
              this.priceExport4.push([netExport,price!]);
            } else if (hour <= 20) {
              this.priceExport5.push([netExport,price!]);
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
    this.priceExport1 = [];
    this.priceExport2 = [];
    this.priceExport3 = [];
    this.priceExport4 = [];
    this.priceExport5 = [];
  }
}
