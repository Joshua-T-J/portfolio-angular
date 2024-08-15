import { NgClass } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  imports: [NgClass],
  standalone: true,
})
export class FeaturesComponent {
  features: Features[] = [
    {
      Title: 'Web Development',
      Description:
        'There are three responses to a piece of design – yes, no, and WOW! Wow is the one to aim for',
      IconClass: 'bi-code-slash',
      Id: 1,
    },
    {
      Title: 'Photography',
      Description:
        'The photo that you took with your camera is the imagination you want to create with reality.',
      IconClass: 'bi-camera',
      Id: 2,
    },
    {
      Title: 'Editing',
      Description:
        'The world always seems brighter when you’ve just made something that wasn’t there before.',
      IconClass: 'bi-sliders2',
      Id: 3,
    },
  ];
}

type Features = {
  Id: number;
  Title: string;
  Description: string;
  IconClass: string;
};
