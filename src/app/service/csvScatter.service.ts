import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CsvScatterService {

  //Time-series arrays
  public priceExport: number[][] = [];

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
            // dayAheadPrice 18 - dayAheadNeighbourPrice 19
            const netExport = Math.round(Number(row[20]));
            if (netExport > 5) {
              this.priceExport.push([netExport, Math.round((Number(row[19]) - Number(row[18])) * 100) / 100]);
            } else if (netExport < -5) {
              this.priceExport.push([netExport, Math.round((Number(row[18]) - Number(row[19])) * 100) / 100]);
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
    this.priceExport = [];
  }
}
