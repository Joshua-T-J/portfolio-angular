import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-project-loading',
  templateUrl: './project-loading.component.html',
  styleUrls: ['./project-loading.component.css'],
})
export class ProjectLoadingComponent {
  @Input() show: boolean = false;
  constructor(public commonService: CommonService) {}
}
