import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Portfolio';
  themeSwitch = new FormControl(false);
  currentYear = new Date().getFullYear();
  constructor(@Inject(DOCUMENT) private document: Document) {
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
    if (scrollBtn) {
      scrollBtn.style.setProperty('--scroll', `${scrolled}%`);

      if (winScroll > 50) {
        scrollBtn.style.display = 'grid';
      } else {
        scrollBtn.style.display = 'none';
      }
    }
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
}
