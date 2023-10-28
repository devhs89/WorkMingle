import {Component, OnInit} from '@angular/core';
import {MediaBreakpointService} from "./services/media-breakpoint.service";
import {Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {PageTitleService} from "./services/page-title.service";
import {AccountService} from "./services/account.service";
import {faCopyright} from "@fortawesome/free-regular-svg-icons/faCopyright";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected xSmallMediaObservable$: Observable<BreakpointState> | null = null;

  constructor(protected pageTitleService: PageTitleService, breakpointsService: MediaBreakpointService, protected accountService: AccountService) {
    this.xSmallMediaObservable$ = breakpointsService.matchBreakpoint(Breakpoints.XSmall);
  }

  ngOnInit(): void {
  }

  protected readonly faCopyright = faCopyright;
}
