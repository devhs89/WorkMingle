import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {ToasterService} from "../services/toaster.service";
import {of, take} from "rxjs";
import {verifyAppRole} from "../helpers/verify-auth-token.helper";
import {appRoles} from "../constants/app-roles.constant";

export const authorizationGuard: CanMatchFn = () => {
  const accountService = inject(AccountService);
  const toasterService = inject(ToasterService);
  const router = inject(Router);
  let valid = false;

  const redirectToEmployerOnboarding = () => {
    router.navigate(['/employer/onboard']).then(() =>
      toasterService.openSnackbar({message: 'You must be an employer to access this page.', type: 'error'}));
  };

  accountService.authResponse$.pipe(take(1)).subscribe({
    next: (authResp) => {
      if (authResp) {
        valid = verifyAppRole(authResp, appRoles.employer);
        if (!valid) redirectToEmployerOnboarding();
        return of(valid);
      } else {
        redirectToEmployerOnboarding();
        return of(valid);
      }
    },
    error: () => {
      redirectToEmployerOnboarding();
      return of(valid);
    }
  });
  return valid;
};
