import { Component, Inject, inject, input } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatIconModule,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  alertTypes = AlertTypes;
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {}
}

export enum AlertTypes {
  SUCCESS,
  ERROR,
}

export type SnackbarData = {
  Type: AlertTypes;
  Message: string;
};
