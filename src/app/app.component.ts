import {Component, OnInit} from '@angular/core';
import packageJson from "../../package.json";

enum Tab {
  Visualization = "Visualization",
  Comparison = "Comparison",
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public version: string = packageJson.version;
  public tabSelected = Tab.Visualization;
  public Tab = Tab;

  constructor() {}

  ngOnInit(): void {}

  changeTab(tab: Tab): void {
    this.tabSelected = tab;
  }

}
