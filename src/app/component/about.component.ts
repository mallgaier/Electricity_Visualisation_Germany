import {Component, EventEmitter, Output} from '@angular/core';
import {Detail, Month, Source, Year} from '../service/enum.service';
import {Tab} from "../app.component";
import {faGlobe, faArrowDownUpAcrossLine, faBoltLightning, faPlug, faCalendar, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {

  @Output() newItemEvent = new EventEmitter<Tab>();
  // Select Options
  public Month = Month;
  public Year = Year;
  public Detail = Detail;
  public Source = Source;
  public Tab = Tab;

  //Icons
  public faBoltLightning = faBoltLightning;
  public faEuroSign = faArrowDownUpAcrossLine;
  public faPlug = faPlug;
  public faCalendar = faCalendar;
  public faCircleInfo = faCircleInfo;
  public faGlobe = faGlobe;
  public faGithub = faGithub;

  public getDescriptionForTab(tab: Tab): string {
    switch (tab) {
      case Tab.dashboard: return 'Explore the electricity production from several viewpoints through a timeline';
      case Tab.priceExport: return 'Understand how the day-ahead price is related to the amount of electricity imported / exported.';
      case Tab.priceGeneration: return 'See which electricity sources determine and push up the price of electricity as a result of the merit order.';
      case Tab.sourceHeatmap:return 'Discover the percentage contribution of each electricity source, broken down by weekdays, to total production.';
      case Tab.timeComparison: return 'Compare two timelines of electricity production';
      case Tab.scatterplot: return 'Identify the correlation of two variables, divided by years or seasons, using a' +
        ' custom-build scatterplot';
      default: return '';
    }
  }

  public emitClick(value: Tab) {
    this.newItemEvent.emit(value);
  }
}
