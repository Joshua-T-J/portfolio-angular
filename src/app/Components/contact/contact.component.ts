import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/Services/common.service';
import { AlertComponent } from 'src/app/Shared/Components/alert/alert.component';
import { SocialMediaIconsComponent } from 'src/app/Shared/Components/social-media-icons/social-media-icons.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SocialMediaIconsComponent,
    NgClass,
  ],
})
export class ContactComponent implements OnInit {
  submitted = signal<boolean>(false);
  phoneRegex: RegExp = /^\d{6,12}$/;
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  contactFormGroup!: FormGroup;
  durationInSeconds: number = 5;

  constructor(
    private service: CommonService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.contactFormGroup = this.fb.group({
      Name: ['', [Validators.required]],
      Phone: ['', [Validators.pattern(this.phoneRegex)]],
      Email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.emailRegex),
        ],
      ],
      Subject: ['', [Validators.required]],
      Message: [''],
    });
  }

  contactFormSubmit() {
    this.submitted.set(true);
    if (this.contactFormGroup.valid) {
      setTimeout(() => {
        this.openSnackBar();
        console.log(this.contactFormGroup.value);
        this.contactFormGroup.reset();
        this.submitted.set(false);
      }, 5000);
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(AlertComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  get contactForm() {
    return this.contactFormGroup;
  }
}
