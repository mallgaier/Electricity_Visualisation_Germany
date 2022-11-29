import {Component} from '@angular/core';
import packageJson from "../../package.json";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {faBoltLightning} from '@fortawesome/free-solid-svg-icons';

/*
Hej fellow developer,
I'm glad that you became aware of this little project.

I must warn you at this point that any changes made to the code are at your own risk.

The project was developed rapidly. Accordingly, the functionality is cobbled together,
the data management is a nightmare, and you will also search in vain for detailed documentation.

The main goal is a working software - everything else is unnecessary :)
 */

export enum Tab {
  explorer = "Data Explorer",
  timeComparison = "Timeline Comparison",
  heatmap = "Heatmap",
  priceExport = "Price and Export",
  about = "About",
  scatterplot = "Scatterplot"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public version: string = packageJson.version;
  public tabSelected = Tab.about;
  public Tab = Tab;

  public faGithub = faGithub;
  public faBoltLightning = faBoltLightning;

  constructor() {}

  changeTab(tab: Tab): void {
    this.tabSelected = tab;
  }

}
