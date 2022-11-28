import {Component, Input} from '@angular/core';
import {Source} from '../service/enum.service';
import {CsvService} from "../service/csv.service";



@Component({
  selector: 'percentage-dashboard',
  templateUrl: './percentage-dashboard.component.html',
  styleUrls: ['../app.component.css', './dashboard.component.css'],
})
export class PercentageDashboardComponent {

  // Displayed values
  @Input() public isUpdating = false;
  public Source = Source;

  constructor(public csvService: CsvService) {
  }


}
