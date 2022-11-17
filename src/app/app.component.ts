import {Component, OnInit} from '@angular/core';
import packageJson from "../../package.json";

/*
Hej fellow developer,
I'm glad that you became aware of this little project.

I must warn you at this point that any changes made to the code are at your own risk.

The project was developed rapidly. Accordingly, the functionality is cobbled together,
the data management is a nightmare, and you will also search in vain for detailed documentation.

The main goal is a working software - everything else is unnecessary :)
 */

enum Tab {
  dashboard = "Dashboard",
  timeComparison = "Timeline Comparison",
  sourceHeatmap = "Source Heatmap",
  priceGeneration ="Price and Generation",
  priceExport = "Price and Export"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public version: string = packageJson.version;
  public tabSelected = Tab.sourceHeatmap;
  public Tab = Tab;

  constructor() {}

  ngOnInit(): void {}

  changeTab(tab: Tab): void {
    this.tabSelected = tab;
  }

}
