import {Component, OnInit} from '@angular/core';
import {JobAdvertInterface} from "../../../interfaces/job-advert.interface";
import {TempConstant} from "../../../constants/temp.constant";
import {MediaBreakpointService} from "../../../services/media-breakpoint.service";
import {Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable} from "rxjs";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  jobListings: JobAdvertInterface[] = TempConstant.dummyJobs;
  xSmallScreen$: Observable<BreakpointState> = new Observable<BreakpointState>();

  constructor(private mediaBreakpointService: MediaBreakpointService) {
  }

  ngOnInit(): void {
    this.xSmallScreen$ = this.mediaBreakpointService.matchBreakpoint(Breakpoints.XSmall);
  }
}
