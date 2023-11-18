import {Component, OnInit, ViewChild} from '@angular/core';
import {JobAdvertInterface, JobAdvertResponseInterface} from "../../../interfaces/job-advert.interface";
import {MediaBreakpointService} from "../../../services/media-breakpoint.service";
import {Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {JobsService} from "../../../services/jobs.service";
import {ToasterService} from "../../../services/toaster.service";
import {PageTitleService} from "../../../services/page-title.service";
import {FormControl, Validators} from "@angular/forms";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  jobListings: JobAdvertInterface[] = [];
  xSmallScreen$: Observable<BreakpointState> = new Observable<BreakpointState>();
  jobTitleFormCtrl = new FormControl<unknown>('', [Validators.pattern('^[a-zA-Z0-9\\s]*$')]);
  locationFormCtrl = new FormControl<unknown>('', [Validators.pattern('^[a-zA-Z0-9\\s]*$')]);
  pageOpts = {docCount: 0, limit: 10, page: 0};
  @ViewChild('jobsListMatPaginator') jobsListMatPaginator: MatPaginator | undefined;

  constructor(private mediaBreakpointService: MediaBreakpointService, private pageTitleService: PageTitleService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute, private jobsService: JobsService) {
    this.pageTitleService.setWindowTitle('Jobs');
    this.pageTitleService.setPageTitle('Jobs');
  }

  ngOnInit(): void {
    this.xSmallScreen$ = this.mediaBreakpointService.matchBreakpoint(Breakpoints.XSmall);
    const {jobTitle, jobLocation} = this.activatedRoute.snapshot.queryParams;
    this.jobTitleFormCtrl.setValue(jobTitle ? jobTitle : '');
    this.locationFormCtrl.setValue(jobLocation ? jobLocation : '');
    this.searchJobsBtnHandler();
  }

  searchJobsBtnHandler() {
    if (this.jobTitleFormCtrl.valid && this.locationFormCtrl.valid) {
      const jobTitle = this.jobTitleFormCtrl.value as string;
      const jobLocation = this.locationFormCtrl.value as string;
      if (this.jobsListMatPaginator) this.jobsListMatPaginator.firstPage();
      if (jobTitle || jobLocation) {
        this._searchJobs(jobTitle, jobLocation, this.pageOpts.page, this.pageOpts.limit);
      } else {
        this._allJobs(this.pageOpts.page, this.pageOpts.limit);
      }
    }
  }

  pageSwitchHandler($event: PageEvent) {
    this.pageOpts.limit = $event.pageSize;
    this.pageOpts.page = $event.pageIndex;
    if (this.jobTitleFormCtrl.valid && this.locationFormCtrl.valid) {
      const jobTitle = this.jobTitleFormCtrl.value as string;
      const jobLocation = this.locationFormCtrl.value as string;
      if (jobTitle || jobLocation) {
        this._searchJobs(jobTitle, jobLocation, this.pageOpts.page, this.pageOpts.limit);
      } else {
        this._allJobs(this.pageOpts.page, this.pageOpts.limit);
      }
    }
  }

  private _populateJobListings({jobsResp, errResp}: {
    jobsResp?: JobAdvertResponseInterface,
    errResp?: HttpErrorResponse
  }) {
    if (errResp || !jobsResp) {
      this.jobListings = [];
      this._setPageTitle();
      this.toasterService.openSnackbar({message: errResp?.error.message ?? 'An error occurred', type: 'error'});
      return;
    }
    if (jobsResp.docCount <= 0) {
      this._setPageTitle();
      this.toasterService.openSnackbar({message: 'No jobs found', type: 'default'});
      return;
    }
    this.jobListings = jobsResp.results;
    this.pageOpts.docCount = jobsResp.docCount;
    this._setPageTitle(jobsResp.docCount);
  }

  private _allJobs(pageNo: number, pageLimit: number) {
    this.jobsService.allJobs({pageNo: pageNo, pageLimit: pageLimit})
      .subscribe({
        next: (jobs) => this._populateJobListings({jobsResp: jobs}),
        error: (err) => this._populateJobListings({errResp: err})
      });
  }

  private _searchJobs(jobTitle: string, jobLocation: string, pageNo: number, pageLimit: number) {
    this.jobsService.searchJobs({
      jobTitle,
      jobLocation,
      pageNo: pageNo,
      pageLimit: pageLimit
    }).subscribe({
      next: (jobs) => this._populateJobListings({jobsResp: jobs}),
      error: (err) => this._populateJobListings({errResp: err})
    });
  }

  private _setPageTitle(docCount?: number) {
    if (docCount) {
      this.pageTitleService.setPageTitle(`${docCount} ${docCount > 1 ? 'jobs' : 'job'} found`);
    } else {
      this.pageTitleService.setPageTitle('Jobs');
    }
  }

  protected readonly Breakpoints = Breakpoints;
}
