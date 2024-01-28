import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../Services/contentful.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  projectDetails: any;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.contentfulService.getProjects().subscribe({
      next: (res) => (this.projects = res),
    });
  }
}
