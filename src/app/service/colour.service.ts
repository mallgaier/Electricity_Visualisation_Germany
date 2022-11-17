import {Injectable} from "@angular/core";
import { Source } from "./enum.service";

@Injectable({
  providedIn: 'root',
})
export class ColourService {

  public Source = Source;
  // Change the HEX-Value of the colours here

  // Used for the detailed chart
  public hydroPumpedStorage =  '#a6cee3';
  public hydroPower =  '#1f78b4';
  public windOffshore =  '#b2df8a';
  public windOnshore =  '#33a02c';
  public nuclear = '#fb9a99';
  public xx =  '#e31a1c';
  public fossilGas = '#fdbf6f';
  public x =  '#ff7f00';
  public other =  '#cab2d6';
  public biomass = '#6a3d9a';
  public photovoltaics =  '#ffff99';
  public brownCoal =  '#b15928';
  public hardCoal = '#b4b4b4'

  // Used for the summarization chart
  public sumRenewables =  '#66c2a5';
  public sumConventional =  '#8da0cb';
  public totalGridLoad =  '#fc8d62';

  public dayAheadPrice = '#a80000';
  public netExport = '#5a5a5a';
  public dayAheadNeighbourPrice = '#5500AA';

  public sourceTo(source: Source): string {
    switch (source) {
      case Source.hydroPumpedStorage: return this.hydroPumpedStorage;
      case Source.hydroPower: return this.hydroPower;
      case Source.hydroPowerCombined: return this.hydroPower;
      case Source.windOffshore: return this.windOffshore;
      case Source.windOnshore: return this.windOnshore;
      case Source.wind: return this.windOnshore;
      case Source.nuclear: return this.nuclear;
      case Source.fossilGas : return this.fossilGas;
      case Source.other : return this.other;
      case Source.biomass: return this.biomass;
      case Source.photovoltaics : return this.photovoltaics;
      case Source.brownCoal: return this.brownCoal;
      case Source.hardCoal : return this.hardCoal;
      case Source.coal : return this.brownCoal;
    }
    
    public sourceToColour(source: Source): string {
    switch (source) {
      case Source.hydroPumpedStorage: return '#08306b';
      case Source.hydroPower: return '#08306b';
      case Source.hydroPowerCombined: return '#08306b';
      case Source.windOffshore: return '#00441b';
      case Source.windOnshore: return '#00441b';
      case Source.wind: return '#00441b';
      case Source.nuclear: return '#67000d';
      case Source.fossilGas : return '#7f2704';
      case Source.other : return '#3f007d';
      case Source.biomass: return '#3f007d';
      case Source.photovoltaics : return this.photovoltaics;
      case Source.brownCoal: return '#000000';
      case Source.hardCoal : return '#000000';
      case Source.coal : return '#000000';
    }
  }
}
