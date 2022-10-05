import { HttpClient } from "@angular/common/http";
import {Component, OnInit} from "@angular/core";

export class CsvParserClass implements OnInit {

  public datetime: Date[] = [];
  public biomass: number[] = [];
  public hydropower: number[] = [];
  public windOffshore: number[] = [];
  public windOnshore: number[] = [];
  public photovoltaics: number[] = [];
  public otherRenewable: number[] = [];
  public nuclear: number[] = [];
  public brownCcoal: number[] = [];
  public hardCoal: number[] = [];
  public fossilGas: number[] = [];
  public hydroPumpedStorage: number[] = [];
  public otherConventional: number[] = [];
  public totalGridLoad: number[] = [];
  public residualLoad: number[] = [];
  public reverseHydroPumpedStorage: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

   readCSV(url: string) {
    this.http.get('assets/csv.csv', {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
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
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
