import { Component } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-loading-card',
  templateUrl: './loading-card.component.html',
  styleUrls: ['./loading-card.component.css'],
})
export class LoadingCardComponent {
  constructor(public commonService: CommonService) {}
}
