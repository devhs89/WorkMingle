import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {catchError, map, of} from "rxjs";
import {ToasterService} from "../services/toaster.service";
import {RedirectOptionsEnum} from "../constants/redirect-options.enum";

export const authenticationGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toasterService = inject(ToasterService);

  const redirectToLogin = () => {
    accountService.logoutUser(RedirectOptionsEnum.LOGIN)?.then(() =>
      toasterService.openSnackbar({message: 'Session expired. Please login again.', type: 'error'}));
  };

  return accountService.validateAuthToken().pipe(map((valid) => {
    if (!valid) redirectToLogin();
    return valid;
  }), catchError(() => {
    redirectToLogin();
    return of(false);
  }));
};
