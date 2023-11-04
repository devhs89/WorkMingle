import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ToastComponent} from "../components/shared/toast/toast.component";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackbar: MatSnackBar) {
  }

  openSnackbar({message, type = 'default', config}: {
    message: string,
    type: 'success' | 'error' | 'default',
    config?: MatSnackBarConfig
  }) {

    this.snackbar.openFromComponent(ToastComponent, {
      data: {message: message, type: type}, ...config,
      panelClass: this._determinePanelClass(type)
    });
  }

  private _determinePanelClass(type: "success" | "error" | "default") {
    switch (type) {
      case "success":
        return "toast-success";
      case "error":
        return "toast-error";
      default:
        return "";
    }
  }
}
