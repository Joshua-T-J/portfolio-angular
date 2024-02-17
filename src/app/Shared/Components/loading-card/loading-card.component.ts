import { Component } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-loading-card',
    templateUrl: './loading-card.component.html',
    styleUrls: ['./loading-card.component.css'],
    standalone: true,
    imports: [NgIf],
})
export class LoadingCardComponent {
  constructor(public commonService: CommonService) {}
}
