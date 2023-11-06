import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {of, take} from "rxjs";
import {ToasterService} from "../services/toaster.service";
import {RedirectOptionsEnum} from "../constants/redirect-options.enum";
import {verifyAppRole} from "../helpers/verify-auth-token.helper";
import {appRoles} from "../constants/app-roles.constant";

export const authenticationGuard: CanActivateFn = async () => {
  const accountService = inject(AccountService);
  const toasterService = inject(ToasterService);
  let valid = false;

  const redirectToLogin = () => {
    accountService.logoutUser(RedirectOptionsEnum.LOGIN)?.then(() =>
      toasterService.openSnackbar({message: 'Session expired. Please login again.', type: 'error'}));
  };

  accountService.authResponse$.pipe(take(1)).subscribe({
    next: (authResp) => {
      if (authResp) {
        valid = verifyAppRole(authResp, appRoles.user);
        if (!valid) redirectToLogin();
        return of(valid);
      } else {
        redirectToLogin();
        return of(valid);
      }
    },
    error: () => {
      redirectToLogin();
      return of(valid);
    }
  });
  return valid;
};
