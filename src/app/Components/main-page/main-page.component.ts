import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import { ResumeComponent } from '../resume/resume.component';
import { ProjectsComponent } from '../projects/projects.component';
import { FeaturesComponent } from '../features/features.component';
import { HomeComponent } from '../home/home.component';
import { LoadingCardComponent } from '../../Shared/Components/loading-card/loading-card.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: true,
  imports: [
    HomeComponent,
    FeaturesComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    LoadingCardComponent,
  ],
})
export class MainPageComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  scrollToSection(section: any) {
    const element: HTMLElement | null = document.getElementById(section);
    if (element) {
      element.scrollTo({ behavior: 'smooth', top: 50 });
    }
  }
}
