import {
  transition,
  style,
  animate,
  trigger,
  query,
  stagger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf, NgFor, SlicePipe } from '@angular/common';

const fadeAnimation = [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger(100, [animate('0.5s', style({ opacity: 1 }))]),
      ],
      { optional: true }
    ),
    query(':leave', animate('0.5s', style({ opacity: 0 })), { optional: true }),
  ]),
];
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [trigger('fadeInOut', fadeAnimation)],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        MatTooltipModule,
        SlicePipe,
    ],
})
export class HomeComponent implements OnInit {
  toRotate: string[] = [
    'A Web Developer.',
    'And a Photographer.',
    'I Adore Exploring New Things.',
  ];

  get stateName() {
    return this.showMore ? 'show' : 'hide';
  }

  skillsIcons: ISkillsIcons[] = [
    { IconSrc: '../../../assets/SVGs/angular.svg', Title: 'Angular' },
    {
      IconSrc: '../../../assets/SVGs/javascript.svg',
      Title: 'Javascript',
    },
    {
      IconSrc: '../../../assets/SVGs/csharp.svg',
      Title: 'C#',
    },
    {
      IconSrc: '../../../assets/SVGs/html.svg',
      Title: 'HTML5',
    },
    {
      IconSrc: '../../../assets/SVGs/css.svg',
      Title: 'CSS3',
    },
    {
      IconSrc: '../../../assets/SVGs/typescript.svg',
      Title: 'Typescript',
    },
    {
      IconSrc: '../../../assets/SVGs/react.svg',
      Title: 'React',
    },
  ];
  period: number = 2000;
  txt: string = '';
  fullTxt: string = '';
  isDeleting: boolean = false;
  loopNum: number = 0;
  showMore: boolean = false;

  ngOnInit(): void {
    this.tick();
  }

  tick(): void {
    let i = this.loopNum % this.toRotate.length;
    this.fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = this.fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = this.fullTxt.substring(0, this.txt.length + 1);
    }

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === this.fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      this.tick();
    }, delta);
  }

  toggleMore() {
    this.showMore = !this.showMore;
  }
}

interface ISkillsIcons {
  IconSrc: string;
  Title: string;
}
