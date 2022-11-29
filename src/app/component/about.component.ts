import {Component, EventEmitter, Output} from '@angular/core';
import {Detail, Month, Source, Year} from '../service/enum.service';
import {Tab} from "../app.component";
import {faGlobe, faArrowDownUpAcrossLine, faBoltLightning, faPlug, faCalendar, faCircleInfo, faCloud} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['../app.component.css'],
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
  public faCloud = faCloud;
  public faGithub = faGithub;

  public emitClick(value: Tab) {
    this.newItemEvent.emit(value);
  }
}
