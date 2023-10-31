import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaBreakpointService} from "./services/media-breakpoint.service";
import {Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";
import {PageTitleService} from "./services/page-title.service";
import {AccountService} from "./services/account.service";
import {faCopyright} from "@fortawesome/free-regular-svg-icons/faCopyright";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons/faCircleUser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  protected xSmallMediaObservable$: Observable<BreakpointState> | null = null;
  private _getUserProfileSubscription: Subscription | null = null;
  private _subscriptions: Subscription[] = [];

  constructor(protected pageTitleService: PageTitleService, breakpointsService: MediaBreakpointService, protected accountService: AccountService) {
    this.xSmallMediaObservable$ = breakpointsService.matchBreakpoint(Breakpoints.XSmall);
  }

  ngOnInit(): void {
    this._getUserProfileSubscription = this.accountService.getUserProfile().subscribe({
      error: () => {
        this.accountService.logoutUser();
      }
    });
    this._subscriptions.push(this._getUserProfileSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  protected readonly faCopyright = faCopyright;
  protected readonly faCircleUser = faCircleUser;
}
