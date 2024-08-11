import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, Type } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/Services/common.service';
import {
  AlertComponent,
  AlertTypes,
} from 'src/app/Shared/Components/alert/alert.component';
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
    AlertComponent,
  ],
  providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: {} }],
})
export class ContactComponent implements OnInit {
  submitted = signal<boolean>(false);
  phoneRegex: RegExp = /^\d{6,12}$/;
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  contactFormGroup!: FormGroup;
  durationInSeconds: number = 5;
  alertTypes = AlertTypes;
  constructor(
    private service: CommonService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private http: HttpClient
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
    this.openSnackBar(
      "Thanks for the message! I'll get back to you soon!",
      this.alertTypes.SUCCESS
    );
  }

  openSnackBar(message: string, type: AlertTypes) {
    this._snackBar.openFromComponent(AlertComponent, {
      data: { Type: type, Message: message },
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  contactFormSubmit() {
    this.submitted.set(true);
    let messageTxt: string;
    if (this.contactFormGroup.valid) {
      this.contactFormGroup.disable(); // disable the form if it's valid to disable multiple submissions
      const formData = new FormData();
      formData.append('Name', this.contactFormGroup.get('Name')?.value);
      formData.append('Email', this.contactFormGroup.get('Email')?.value);
      formData.append('Phone', this.contactFormGroup.get('Phone')?.value);
      formData.append('Subject', this.contactFormGroup.get('Subject')?.value);
      formData.append('Message', this.contactFormGroup.get('Message')?.value);

      this.service.submitForm(formData).subscribe({
        next: (response: any) => {
          if (response.result === 'success') {
            messageTxt = "Thanks for the message! I'll get back to you soon!";
            this.openSnackBar(messageTxt, this.alertTypes.SUCCESS);
            this.contactFormGroup.reset();
          } else {
            messageTxt = 'Oops! Something went wrong... Try again later.';
            this.openSnackBar(messageTxt, this.alertTypes.ERROR);
          }
          this.submitted.set(false);
          this.contactFormGroup.enable(); // re-enable the form after a success
          console.log(response);
        },
        error: (error) => {
          this.submitted.set(false);
          messageTxt = 'Oops! An error occurred... Try again later.';
          this.openSnackBar(messageTxt, this.alertTypes.ERROR);
          this.contactFormGroup.enable(); // re-enable the form after a success
          console.log(error);
        },
      });
    }
  }

  get contactForm() {
    return this.contactFormGroup;
  }
}
