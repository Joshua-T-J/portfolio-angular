import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { ContentfulService } from 'src/app/Services/contentful.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  projectDetails: any;
  @ViewChild('project') project!: ElementRef;

  constructor(
    private contentfulService: ContentfulService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.contentfulService.getSingleProject(params.get('id') as string)
        )
      )
      .subscribe({
        next: (entry) => {
          this.projectDetails = entry;
        },
      });
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
