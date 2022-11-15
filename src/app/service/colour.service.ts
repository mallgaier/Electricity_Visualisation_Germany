import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ColourService {
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
  public totalGridLoad =  '#fc8d62'

}
