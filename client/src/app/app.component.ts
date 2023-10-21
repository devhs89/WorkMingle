import {Component, OnInit} from '@angular/core';
import {MediaBreakpointService} from "./services/media-breakpoint.service";
import {Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {PageTitleService} from "./services/page-title.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected xSmallMediaObservable$: Observable<BreakpointState> | null = null;

  constructor(protected pageTitleService: PageTitleService, private breakpointsService: MediaBreakpointService) {
    this.xSmallMediaObservable$ = breakpointsService.matchBreakpoint(Breakpoints.XSmall);
  }

  ngOnInit(): void {
  }
}
