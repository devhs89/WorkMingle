import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaBreakpointService} from "./services/media-breakpoint.service";
import {Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";
import {PageTitleService} from "./services/page-title.service";
import {AccountService} from "./services/account.service";
import {faCopyright} from "@fortawesome/free-regular-svg-icons/faCopyright";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons/faCircleUser";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import {Router} from "@angular/router";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import {RedirectOptionsEnum} from "./constants/redirect-options.enum";
import {verifyActiveMember, verifyAppRole} from "./helpers/verify-auth-token.helper";
import {appRoles} from "./constants/app-roles.constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  protected xSmallMediaObservable$: Observable<BreakpointState> | null = null;
  authResponseSubscription: Subscription | null = null;
  subscriptions: Subscription[] = [];

  constructor(protected pageTitleService: PageTitleService, breakpointsService: MediaBreakpointService, protected accountService: AccountService, protected router: Router) {
    this.xSmallMediaObservable$ = breakpointsService.matchBreakpoint(Breakpoints.XSmall);
  }

  ngOnInit(): void {
  }

  isAppRole(appRole: string): boolean {
    let valid = false;
    this.authResponseSubscription = this.accountService.authResponse$.subscribe({
      next: (resp) => {
        if (resp) valid = verifyAppRole(resp, appRole);
      }
    });
    this.subscriptions.push(this.authResponseSubscription);
    return valid;
  }

  isActiveMember(): boolean {
    let valid = false;
    this.authResponseSubscription = this.accountService.authResponse$.subscribe({
      next: (resp) => {
        if (resp) valid = verifyActiveMember(resp);
      }
    });
    this.subscriptions.push(this.authResponseSubscription);
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected readonly verifyActiveMember = verifyActiveMember;
}
