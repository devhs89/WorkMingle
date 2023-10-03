import {Component, OnInit} from '@angular/core';
import {MediaBreakpointService} from "./services/media-breakpoint.service";
import {Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {Title} from "@angular/platform-browser";
import {PageTitleService} from "./services/page-title.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected breakpointObservable$: Observable<BreakpointState> | null = null;

  constructor(private titleService: Title, protected pageTitleService: PageTitleService, private breakpointsService: MediaBreakpointService) {
    this.breakpointObservable$ = breakpointsService.matchBreakpoint(Breakpoints.XSmall);
  }

  ngOnInit(): void {
    this.titleService.setTitle('Home | WorkMingle');
  }
}
