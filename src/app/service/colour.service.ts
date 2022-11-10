import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ColourService {
  // Change the HEX-Value of the colours here

  // Used for the detailed chart
  public hydroPumpedStorage =  '#a6cee3'; //c
  public photovoltaics =  '#ffff99'; //c
  public windOffshore =  '#b2df8a'; //c
  public windOnshore =  '#33a02c'; //c
  public biomass =  '#24CBE5';
  public hydroPower =  '#1f78b4'; //c
  public otherRenewables =  '#FF9655';
  public fossilGas =  '#FFF263';
  public nuclear =  '#6AF9C4';
  public brownCoal =  '#b15928'; //c
  public hardCoal =  '#50B432';
  public otherConventional =  '#ED561B';

  // Used for the summarization chart
  public sumRenewables =  '#66c2a5';
  public sumConventional =  '#8da0cb';
  public totalDemand =  '#fc8d62'

}
