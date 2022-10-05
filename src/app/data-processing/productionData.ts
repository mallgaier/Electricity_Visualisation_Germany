import productionJson from './productionData.json';

class Production {

  public datetime: Date;
  public biomass: number;
  public hydropower: number;
  public windOffshore: number;
  public windOnshore: number;
  public photovoltaics: number;
  public otherRenewable: number;
  public nuclear: number;
  public brownCcoal: number;
  public hardCoal: number;
  public fossilGas: number;
  public hydroPumpedStorage: number;
  public otherConventional: number;
  public totalGridLoad: number;
  public residualLoad: number;
  public reverseHydroPumpedStorage: number;

  public productionData = productionJson;


  constructor(datetime: Date, biomass: number, hydropower: number, windOffshore: number, windOnshore: number, photovoltaics: number, otherRenewable: number, nuclear: number, brownCcoal: number, hardCoal: number, fossilGas: number, hydroPumpedStorage: number, otherConventional: number, totalGridLoad: number, residualLoad: number, reverseHydroPumpedStorage: number) {
    this.datetime = datetime;
    this.biomass = biomass;
    this.hydropower = hydropower;
    this.windOffshore = windOffshore;
    this.windOnshore = windOnshore;
    this.photovoltaics = photovoltaics;
    this.otherRenewable = otherRenewable;
    this.nuclear = nuclear;
    this.brownCcoal = brownCcoal;
    this.hardCoal = hardCoal;
    this.fossilGas = fossilGas;
    this.hydroPumpedStorage = hydroPumpedStorage;
    this.otherConventional = otherConventional;
    this.totalGridLoad = totalGridLoad;
    this.residualLoad = residualLoad;
    this.reverseHydroPumpedStorage = reverseHydroPumpedStorage;
  }
}
