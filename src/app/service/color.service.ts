import {Injectable} from "@angular/core";
import {Source} from "./enum.service";

@Injectable({
  providedIn: 'root',
})
export class ColorService {

  /*
  Colors are mostly chosen using the Color Brewer
  https://github.com/axismaps/colorbrewer/
   */

  public Source = Source;

  // Used for the detailed chart
  public hydroPumpedStorage = '#a6cee3';
  public hydroPower = '#1f78b4';
  public windOffshore = '#b2df8a';
  public windOnshore = '#33a02c';
  public nuclear = '#fb9a99';
  public xx = '#e31a1c';
  public fossilGas = '#fdbf6f';
  public x = '#ff7f00';
  public other = '#cab2d6';
  public biomass = '#6a3d9a';
  public photovoltaics = '#ffff99';
  public brownCoal = '#b15928';
  public hardCoal = '#b4b4b4'

  // Used for the summarization chart
  public sumRenewables = '#66c2a5';
  public sumConventional = '#8da0cb';
  public totalGridLoad = '#fc8d62';

  public dayAheadPrice = '#a80000';

  public blue9sequential = [
    [0, '#f7fbff'],
    [0.125, '#deebf7'],
    [0.25, '#c6dbef'],
    [0.375, '#9ecae1'],
    [0.5, '#6baed6'],
    [0.625, '#4292c6'],
    [0.75, '#2171b5'],
    [0.875, '#08519c'],
    [1, '#08306b'],
  ]

  public green9sequential = [
    [0, '#f7fcf5'],
    [0.125, '#e5f5e0'],
    [0.25, '#c7e9c0'],
    [0.375, '#a1d99b'],
    [0.5, '#74c476'],
    [0.625, '#41ab5d'],
    [0.75, '#238b45'],
    [0.875, '#006d2c'],
    [1, '#00441b'],
  ]

  public orange9sequential = [
    [0, '#fff5eb'],
    [0.125, '#fee6ce'],
    [0.25, '#fdd0a2'],
    [0.375, '#fdae6b'],
    [0.5, '#fd8d3c'],
    [0.625, '#f16913'],
    [0.75, '#d94801'],
    [0.875, '#a63603'],
    [1, '#7f2704'],
  ]

  public purple9sequential = [
    [0, '#fcfbfd'],
    [0.125, '#efedf5'],
    [0.25, '#dadaeb'],
    [0.375, '#bcbddc'],
    [0.5, '#9e9ac8'],
    [0.625, '#807dba'],
    [0.75, '#6a51a3'],
    [0.875, '#54278f'],
    [1, '#3f007d'],
  ]

  public red9sequential = [
    [0, '#fff5f0'],
    [0.125, '#fee0d2'],
    [0.25, '#fcbba1'],
    [0.375, '#fc9272'],
    [0.5, '#fb6a4a'],
    [0.625, '#ef3b2c'],
    [0.75, '#cb181d'],
    [0.875, '#a50f15'],
    [1, '#67000d'],
  ]

  public black9sequential = [
    [0, '#ffffff'],
    [0.125, '#f0f0f0'],
    [0.25, '#d9d9d9'],
    [0.375, '#bdbdbd'],
    [0.5, '#969696'],
    [0.625, '#737373'],
    [0.75, '#525252'],
    [0.875, '#252525'],
    [1, '#000000'],
  ]

  public ylOrRd9sequential = [
    [0, '#ffffcc'],
    [0.125, '#ffeda0'],
    [0.25, '#fed976'],
    [0.375, '#feb24c'],
    [0.5, '#fd8d3c'],
    [0.625, '#fc4e2a'],
    [0.75, '#e31a1c'],
    [0.875, '#bd0026'],
    [1, '#800026'],
  ]

  public sourceToSequentialColorScale(source: Source): (number | string)[][] {
    switch (source) {
      case Source.hydroPower:
        return this.blue9sequential;
      case Source.windOffshore:
      case Source.windOnshore:
      case Source.wind:
        return this.green9sequential;
      case Source.nuclear:
        return this.red9sequential;
      case Source.solar :
      case Source.fossilGas :
        return this.orange9sequential;
      case Source.other :
      case Source.biomass:
        return this.purple9sequential;
      case Source.brownCoal:
      case Source.hardCoal :
      case Source.coal :
        return this.black9sequential;
      default:
        return [];
    }
  }

}
