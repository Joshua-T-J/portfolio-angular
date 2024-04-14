import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/Services/common.service';
import { SocialMediaIconsComponent } from 'src/app/Shared/Components/social-media-icons/social-media-icons.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, SocialMediaIconsComponent],
})
export class ContactComponent implements OnInit {
  constructor(private service: CommonService, private fb: FormBuilder) {}
  ngOnInit(): void {}
}
