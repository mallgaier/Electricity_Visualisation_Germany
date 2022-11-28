import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CsvService {

  //Time-series arrays
  public datetime: string[] = [];
  public biomass: number[] = [];
  public hydropower: number[] = [];
  public windOffshore: number[] = [];
  public windOnshore: number[] = [];
  public photovoltaics: number[] = [];
  public otherRenewable: number[] = [];
  public nuclear: number[] = [];
  public brownCoal: number[] = [];
  public hardCoal: number[] = [];
  public fossilGas: number[] = [];
  public hydroPumpedStorage: number[] = [];
  public other: number[] = [];
  public totalGridLoad: number[] = [];
  public residualLoad: number[] = [];
  public reverseHydroPumpedStorage: number[] = [];
  public sumConventional: number[] = [];
  public sumRenewable: number[] = [];
  public hydroPowerSummed: number[] = [];
  public sumWind: number[] = [];
  public sumCoal: number[] = [];
  public dayAheadPrice: number[] = [];
  public dayAheadNeighbourPrice: number[] = [];
  public netExport: number[] = [];
  public deltaPrice: number[] = [];

  //Aggregated values
  public biomassAggregated = 0;
  public hydropowerAggregated = 0;
  public windOffshoreAggregated = 0;
  public windOnshoreAggregated = 0;
  public photovoltaicsAggregated = 0;
  public nuclearAggregated = 0;
  public brownCoalAggregated = 0;
  public hardCoalAggregated = 0;
  public fossilGasAggregated = 0;
  public hydroPumpedStorageAggregated = 0;
  public otherAggregated = 0;
  public totalGridLoadAggregated = 0;
  public residualLoadAggregated = 0;
  public reverseHydroPumpedStorageAggregated = 0;
  public sumConventionalAggregated = 0;
  public sumRenewableAggregated = 0;
  public sumHydroPowerAggregated = 0;
  public sumWindAggregated = 0;
  public sumCoalAggregated = 0;

  constructor(private http: HttpClient) {
  }

  async updateCSVAndAggregatedValues(url: string): Promise<boolean> {
    return this.updateCSV(url, true);
  }

  async updateCSV(url: string, aggValues: boolean): Promise<boolean> {
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

            // 1995-12-17T03:24:00
            this.datetime.push(row[0]);
            this.biomass.push(Number(row[1]));
            this.hydropower.push(Number(row[2]));
            this.windOffshore.push(Number(row[3]));
            this.windOnshore.push(Number(row[4]));
            this.photovoltaics.push(Number(row[5]));
            this.nuclear.push(Number(row[7]));
            this.brownCoal.push(Number(row[8]));
            this.hardCoal.push(Number(row[9]));
            this.fossilGas.push(Number(row[10]));
            this.hydroPumpedStorage.push(Number(row[11]));
            this.other.push(Number(row[6]) + Number(row[12]));
            this.totalGridLoad.push(Number(row[13]));
            this.residualLoad.push(Number(row[14]));
            this.reverseHydroPumpedStorage.push(Number(row[15]));
            this.sumConventional.push(Number(row[16]));
            this.sumRenewable.push(Number(row[17]));
            this.hydroPowerSummed.push(Number(row[2]) + Number(row[11]));
            this.sumWind.push(Number(row[3]) + Number(row[4]));
            this.sumCoal.push(Number(row[8]) + Number(row[9]));
            this.dayAheadPrice.push(Number(row[18]));
            this.dayAheadNeighbourPrice.push(Number(row[19]));
            this.netExport.push(Number(row[20]));
            this.deltaPrice.push(Number(row[18]) - Number(row[19]));

          }
        },
        error => {
          console.log(error);
          return false;
        },
        () => {
          if (aggValues) {
            this.updateAggregatedValues();
          }
        }
      );
    return true;
  }

  updateAggregatedValues():void {
    this.biomassAggregated = this.biomass.reduce((sum, current) => sum + current, 0);
    this.hydropowerAggregated = this.hydropower.reduce((sum, current) => sum + current, 0);
    this.windOffshoreAggregated = this.windOffshore.reduce((sum, current) => sum + current, 0);
    this.windOnshoreAggregated = this.windOnshore.reduce((sum, current) => sum + current, 0);
    this.photovoltaicsAggregated = this.photovoltaics.reduce((sum, current) => sum + current, 0);
    this.nuclearAggregated = this.nuclear.reduce((sum, current) => sum + current, 0);
    this.brownCoalAggregated = this.brownCoal.reduce((sum, current) => sum + current, 0);
    this.hardCoalAggregated = this.hardCoal.reduce((sum, current) => sum + current, 0);
    this.fossilGasAggregated = this.fossilGas.reduce((sum, current) => sum + current, 0);
    this.hydroPumpedStorageAggregated = this.hydroPumpedStorage.reduce((sum, current) => sum + current, 0);
    this.otherAggregated = this.other.reduce((sum, current) => sum + current, 0);
    this.totalGridLoadAggregated = this.totalGridLoad.reduce((sum, current) => sum + current, 0);
    this.sumConventionalAggregated = this.sumConventional.reduce((sum, current) => sum + current, 0);
    this.sumRenewableAggregated = this.sumRenewable.reduce((sum, current) => sum + current, 0);
    this.sumHydroPowerAggregated = this.hydroPowerSummed.reduce((sum, current) => sum + current, 0);
    this.sumWindAggregated = this.sumWind.reduce((sum, current) => sum + current, 0);
    this.sumCoalAggregated = this.sumCoal.reduce((sum, current) => sum + current, 0);
  }

  private initArrays(): void {
    this.datetime = [];
    this.biomass = [];
    this.hydropower = [];
    this.windOffshore = [];
    this.windOnshore = [];
    this.photovoltaics = [];
    this.otherRenewable = [];
    this.nuclear = [];
    this.brownCoal = [];
    this.hardCoal = [];
    this.fossilGas = [];
    this.hydroPumpedStorage = [];
    this.other = [];
    this.totalGridLoad = [];
    this.residualLoad = [];
    this.reverseHydroPumpedStorage = [];
    this.sumConventional = [];
    this.sumRenewable = [];
    this.hydroPowerSummed = [];
    this.sumWind = [];
    this.sumCoal = [];
    this.dayAheadPrice = [];
    this.dayAheadNeighbourPrice = [];
    this.netExport = [];
    this.deltaPrice = [];
  }
}
