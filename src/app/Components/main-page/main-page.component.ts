import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => this.scrollToSection(fragment));
  }

  scrollToSection(section: any) {
    document
      .getElementById(section)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
