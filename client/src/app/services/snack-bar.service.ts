import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

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
}
