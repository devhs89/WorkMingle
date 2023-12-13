import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {firstValueFrom} from "rxjs";
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

  try {
    const authResp = await firstValueFrom(accountService.authResponse$);
    if (authResp) {
      valid = verifyAppRole(authResp, appRoles.freeUser);
      if (!valid) redirectToLogin();
      return valid;
    } else {
      redirectToLogin();
      return valid;
    }
  } catch (e) {
    redirectToLogin();
    return valid;
  }
};
