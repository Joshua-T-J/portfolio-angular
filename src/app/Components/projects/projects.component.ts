import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../Services/contentful.service';
import { CommonService } from 'src/app/Services/common.service';
import { RouterLink } from '@angular/router';
import { LoadingCardComponent } from '../../Shared/Components/loading-card/loading-card.component';
import { NgFor, NgClass, SlicePipe, NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [
    NgFor,
    LoadingCardComponent,
    RouterLink,
    NgClass,
    SlicePipe,
    MatTooltipModule,
    NgOptimizedImage,
  ],
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  projectDetails: any;
  showMore: boolean = false;

  constructor(
    private contentfulService: ContentfulService,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.commonService.setLoading(true);
    this.contentfulService.getProjectTypes().subscribe({
      next: (res) => (this.projects = res),
      error: () => this.commonService.setLoading(false),
      complete: () => this.commonService.setLoading(false),
    });
  }

  toggleMore() {
    this.showMore = !this.showMore;
  }
}
