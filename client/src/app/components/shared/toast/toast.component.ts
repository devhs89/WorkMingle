import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  iconName: string = 'close';

  constructor(protected _toastRef: MatSnackBarRef<ToastComponent>, @Inject(MAT_SNACK_BAR_DATA) protected data: {
    message: string,
    type: 'success' | 'error' | 'default'
  }) {
    this.setIconFeedback();
  }

  setIconFeedback() {
    switch (this.data.type) {
      case 'success':
        this.iconName = 'check_circle';
        break;
      case 'error':
        this.iconName = 'error';
        break;
      default:
        this.iconName = 'close';
        break;
    }
  }
}
