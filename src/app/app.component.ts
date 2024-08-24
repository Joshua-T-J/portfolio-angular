import { DOCUMENT, NgClass, NgIf } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    NgClass,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
})
export class AppComponent {
  title = 'Portfolio';
  sideBarOpen: boolean = false;
  themeSwitch = new FormControl(false);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute
  ) {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      if (currentTheme === 'dark') {
        this.themeSwitch.setValue(true);
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const scrollBtn = document.getElementById('goto-top');
    const sideBar = document.getElementById('side-bar');
    if (scrollBtn) {
      scrollBtn.style.setProperty('--scroll', `${scrolled}%`);
      if (winScroll > 400) {
        scrollBtn.style.display = 'grid';
        // sideBar ? (sideBar.style.display = 'block') : '';
      } else {
        scrollBtn.style.display = 'none';
        // sideBar ? (sideBar.style.display = 'none') : '';
      }
    }
  }

  ngOnInit() {
    // this.route.fragment.subscribe({
    //   next: (fragment) => this.scrollToSection(fragment),
    // });
    AOS.init();
  }

  // scrollToSection(section: any) {
  //   document.getElementById(section)?.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //     inline: 'nearest',
  //   });
  // }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  toggleTheme() {
    const isDark = this.themeSwitch.value;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
