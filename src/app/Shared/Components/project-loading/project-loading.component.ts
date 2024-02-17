import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-project-loading',
    templateUrl: './project-loading.component.html',
    styleUrls: ['./project-loading.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink],
})
export class ProjectLoadingComponent {
  @Input() show: boolean = false;
  constructor(public commonService: CommonService) {}
}
