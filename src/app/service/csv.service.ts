import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CsvService {

  public datetime: Date[] = [];
  public biomass: number[] = [];
  public hydropower: number[] = [];
  public windOffshore: number[] = [];
  public windOnshore: number[] = [];
  public photovoltaics: number[] = [];
  public otherRenewable: number[] = [];
  public nuclear: number[] = [1];
  public brownCcoal: number[] = [];
  public hardCoal: number[] = [];
  public fossilGas: number[] = [];
  public hydroPumpedStorage: number[] = [];
  public otherConventional: number[] = [];
  public totalGridLoad: number[] = [];
  public residualLoad: number[] = [];
  public reverseHydroPumpedStorage: number[] = [];
  public sumConventional: number[] = [];
  public sumRenewable: number[] = [];


  constructor(private http: HttpClient) {
  }

  initCSV(url: string): boolean {
    this.initArrays();
    this.http.get(url, {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          // Index 1 due to header
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(";");
            // 1995-12-17T03:24:00
            this.datetime.push(new Date(row[0]));
            this.biomass.push(Number(row[1]));
            this.hydropower.push(Number(row[2]));
            this.windOffshore.push(Number(row[3]));
            this.windOnshore.push(Number(row[4]));
            this.photovoltaics.push(Number(row[5]));
            this.otherRenewable.push(Number(row[6]));
            this.nuclear.push(Number(row[7]));
            this.brownCcoal.push(Number(row[8]));
            this.hardCoal.push(Number(row[9]));
            this.fossilGas.push(Number(row[10]));
            this.hydroPumpedStorage.push(Number(row[11]));
            this.otherConventional.push(Number(row[12]));
            this.totalGridLoad.push(Number(row[13]));
            this.residualLoad.push(Number(row[14]));
            this.reverseHydroPumpedStorage.push(Number(row[15]));
            this.sumConventional.push(Number(row[16]));
            this.sumRenewable.push(Number(row[17]));
          }
        },
        error => {
          console.log('Hello World' + error);
        }
      );
    return true;
  }

  private initArrays() {
    this.datetime = [];
    this.biomass = [];
    this.hydropower = [];
    this.windOffshore = [];
    this.windOnshore = [];
    this.photovoltaics = [];
    this.otherRenewable = [];
    this.nuclear = [1];
    this.brownCcoal = [];
    this.hardCoal = [];
    this.fossilGas = [];
    this.hydroPumpedStorage = [];
    this.otherConventional = [];
    this.totalGridLoad = [];
    this.residualLoad = [];
    this.reverseHydroPumpedStorage = [];
    this.sumConventional = [];
    this.sumRenewable = [];
  }
}
