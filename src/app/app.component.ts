import {Component, OnInit} from '@angular/core';
import packageJson from "../../package.json";

enum Tab {
  dashboard = "Dashboard",
  timeComparison = "Timeline Comparison",
  sourceComparison = "Source Comparison",
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public version: string = packageJson.version;
  public tabSelected = Tab.timeComparison;
  public Tab = Tab;

  constructor() {}

  ngOnInit(): void {}

  changeTab(tab: Tab): void {
    this.tabSelected = tab;
  }

}
