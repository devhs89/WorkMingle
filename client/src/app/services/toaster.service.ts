import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ToastComponent} from "../components/shared/toast/toast.component";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackbar: MatSnackBar) {
  }

  showSnackBar({message, action, config}: { message: string, action?: string, config?: MatSnackBarConfig }) {
    this.snackbar.open(message, action ?? 'Dismiss', {
      duration: config?.duration ?? 3000,
      horizontalPosition: config?.horizontalPosition ?? 'end',
      verticalPosition: config?.verticalPosition ?? 'bottom',
      announcementMessage: config?.announcementMessage ?? message,
      politeness: config?.politeness ?? 'polite',
      panelClass: config?.panelClass ?? ''
    });
  }

  openSnackbar({message, type, config}: { message: string, type: 'success' | 'error' | 'warning' | 'info' | 'default', config?: MatSnackBarConfig }) {
    config = config ?? {};
    switch (type) {
      case 'success':
        config.panelClass = 'toast-success';
        break;
      case 'error':
        config.panelClass = 'toast-error';
        break;
      case 'warning':
        config.panelClass = 'toast-warning';
        break;
      case 'info':
        config.panelClass = 'toast-info';
        break;
      case 'default':
        config.panelClass = 'toast-default';
        break;
    }
    this.snackbar.openFromComponent(ToastComponent, {data: {message: message}, ...config});
  }
}
