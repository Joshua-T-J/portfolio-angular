import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { CommonService } from 'src/app/Services/common.service';
import { ContentfulService } from 'src/app/Services/contentful.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  placeholderImage = '../../assets/Images/Placeholder Image.png';
  projectDetails: any;
  @ViewChild('project') project!: ElementRef;

  constructor(
    private contentfulService: ContentfulService,
    private route: ActivatedRoute,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.setLoading(true);
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.contentfulService.getProjectDetails(params.get('id') as string)
        )
      )
      .subscribe({
        next: (entry) => {
          this.projectDetails = entry;
          this.commonService.setLoading(false);
        },
        error: () => {
          this.commonService.setLoading(false);
        },
      });
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
