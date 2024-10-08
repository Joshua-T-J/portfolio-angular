import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContentfulService } from '../../Services/contentful.service';
import { NgIf, NgFor, NgClass } from '@angular/common';

const translateAnimation = [
  transition('void => *', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate(
      '500ms 300ms ease-in',
      style({ transform: 'translateX(0)', opacity: 1 })
    ),
  ]),
  transition('* => void', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate(
      '200ms ease-out',
      style({ transform: 'translateX(-100%)', opacity: 0 })
    ),
  ]),
];

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  animations: [trigger('translate', translateAnimation)],
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
})
export class ResumeComponent implements OnInit {
  @ViewChild('resumeButtons') resumeButtons!: ElementRef;
  activeTab = 'experience';
  resume: any[] = [];
  skills: any;
  education: any;
  otherSkills: any;
  languages: any;
  certifications: any;
  Experience: any;
  pdfDetails: any;
  truncatedContent!: string;
  remainingContent!: string;
  contentLimit: number = 25;
  isExpanded: { [key: string]: boolean } = {};
  showReadMore: boolean = false;

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.getResumeDetails();
  }

  click(event: any, tabName: string) {
    this.activeTab = tabName;
    const buttonList: HTMLCollection =
      this.resumeButtons.nativeElement.children;
    Array.from(buttonList).forEach((element: Element) => {
      if (element instanceof HTMLElement) {
        element.classList.remove('active');
      }
    });
    let target: HTMLElement = event.target;
    target.classList.add('active');
    tabName === 'skills' ? this.filterSkills() : '';
  }

  getResumeDetails() {
    this.contentfulService.getResume().subscribe({
      next: (res) => {
        this.resume = res;
        let pdfElement = this.resume.find((element) => {
          return element.fields.hasOwnProperty('resumePdf');
        });
        this.pdfDetails = pdfElement ? pdfElement.fields.resumePdf : null;
        this.filterByDetailType();
      },
    });
  }

  filterByDetailType() {
    this.skills = this.resume.find((item) => item.fields.type === 'Skills');
    this.education = this.resume.find(
      (item) => item.fields.type === 'Education'
    );
    this.certifications = this.resume.find(
      (item) => item.fields.type === 'Certifications'
    );
    this.Experience = this.resume.find(
      (item) => item.fields.type === 'Experience'
    );
  }

  filterSkills() {
    this.languages = this.skills?.fields?.resumeDetails.filter((item: any) => {
      return item.SkillType == 'Languages';
    });
    this.otherSkills = this.skills?.fields?.resumeDetails.filter(
      (item: any) => {
        return item.SkillType == 'Other Skill';
      }
    );
  }

  getTruncatedInfo(info: string, company: string): string {
    const words = info.split(' ');
    this.showReadMore = words.length > this.contentLimit;
    return words.length > this.contentLimit
      ? words.slice(0, this.contentLimit).join(' ') +
          (this.isExpanded[company] ? '' : '...')
      : info;
  }

  getRemainingInfo(info: string): string {
    const words = info.split(' ');
    return words.length > this.contentLimit
      ? words.slice(this.contentLimit).join(' ')
      : '';
  }

  toggleContent(company: string) {
    this.isExpanded[company] = !this.isExpanded[company];
  }
}
