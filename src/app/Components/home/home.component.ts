import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  toRotate: string[] = [
    'A Web Developer.',
    'And a Photographer.',
    'I Adore Exploring New Things.',
  ];
  period: number = 2000;
  txt: string = '';
  fullTxt: string = '';
  isDeleting: boolean = false;
  loopNum: number = 0;

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
}
