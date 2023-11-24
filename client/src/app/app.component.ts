import {Component, OnInit} from '@angular/core';
import {MediaBreakpointService} from "./services/media-breakpoint.service";
import {Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, take} from "rxjs";
import {PageTitleService} from "./services/page-title.service";
import {AccountService} from "./services/account.service";
import {faCopyright} from "@fortawesome/free-regular-svg-icons/faCopyright";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons/faCircleUser";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import {Router} from "@angular/router";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import {RedirectOptionsEnum} from "./constants/redirect-options.enum";
import {verifyAppRole} from "./helpers/verify-auth-token.helper";
import {appRoles} from "./constants/app-roles.constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected xSmallMediaObservable$: Observable<BreakpointState> | null = null;

  constructor(protected pageTitleService: PageTitleService, breakpointsService: MediaBreakpointService, protected accountService: AccountService, protected router: Router) {
    this.xSmallMediaObservable$ = breakpointsService.matchBreakpoint(Breakpoints.XSmall);
  }

  ngOnInit(): void {
  }

  isAppRole(appRole: string): boolean {
    let valid = false;
    this.accountService.authResponse$.pipe(take(1)).subscribe({
      next: (resp) => {
        if (resp) valid = verifyAppRole(resp, appRole);
      }
    });
    return valid;
  }

  logoutHandler() {
    this.accountService.logoutUser(RedirectOptionsEnum.HOME);
  }

  protected readonly faCopyright = faCopyright;
  protected readonly faCircleUser = faCircleUser;
  protected readonly faRightFromBracket = faRightFromBracket;
  protected readonly faRightToBracket = faRightToBracket;
  protected readonly appRoles = appRoles;
}
