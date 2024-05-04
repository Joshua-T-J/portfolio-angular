import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-social-media-icons',
  standalone: true,
  imports: [MatTooltipModule, NgClass],
  templateUrl: './social-media-icons.component.html',
  styleUrl: './social-media-icons.component.css',
})
export class SocialMediaIconsComponent {
  socialIcons: ISoicalIcon[] = [
    {
      name: 'Linked In',
      link: 'https://www.linkedin.com/in/joshua-t-j-68121b22a/',
      icon: 'bi-linkedin',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/Joshua-T-J',
      icon: 'bi-github',
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/joshua.t_j/',
      icon: 'bi-instagram',
    },
  ];
}

interface ISoicalIcon {
  name: string;
  link: string;
  icon: string;
}
