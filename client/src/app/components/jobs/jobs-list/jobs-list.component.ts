import {Component, OnInit} from '@angular/core';
import {JobAdvertInterface} from "../../../interfaces/job-advert.interface";
import {MediaBreakpointService} from "../../../services/media-breakpoint.service";
import {Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {JobsService} from "../../../services/jobs.service";
import {ToasterService} from "../../../services/toaster.service";
import {PageTitleService} from "../../../services/page-title.service";
import {FormControl, Validators} from "@angular/forms";

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

  constructor(private mediaBreakpointService: MediaBreakpointService, private pageTitleService: PageTitleService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute, private jobsService: JobsService) {
    this.pageTitleService.setWindowTitle('Jobs');
    this.pageTitleService.setPageTitle('Jobs');
  }

  ngOnInit(): void {
    this.xSmallScreen$ = this.mediaBreakpointService.matchBreakpoint(Breakpoints.XSmall);
    const {jobTitle, loc: jobLocation} = this.activatedRoute.snapshot.queryParams;
    if (jobTitle || jobLocation) {
      this.jobTitleFormCtrl.setValue(jobTitle ? jobTitle : '');
      this.locationFormCtrl.setValue(jobLocation ? jobLocation : '');
      this._searchJobs(jobTitle, jobLocation);
    } else {
      this.jobsService.allJobs().subscribe({
        next: (jobs) => {
          this.jobListings = jobs;
        },
        error: (err) => {
          this.jobListings = [];
          this.toasterService.openSnackbar({message: err.error.message, type: 'error'});
        }
      });
    }
  }

  private _capitalizeText(text: string): string {
    const textArray = text.split(' ');
    const capitalizedTextArray = textArray.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedTextArray.join(' ');
  }

  searchJobsBtnHandler() {
    if (this.jobTitleFormCtrl.valid && this.locationFormCtrl.valid) {
      const jobTitle = this.jobTitleFormCtrl.value as string;
      const jobLocation = this.locationFormCtrl.value as string;
      this._searchJobs(jobTitle, jobLocation);
    }
  }

  private _searchJobs(jobTitle: string, jobLocation: string) {
    this.jobsService.searchJobs({jobTitle, jobLocation}).subscribe({
      next: (jobs) => {
        if (jobs.length === 0) {
          this.toasterService.openSnackbar({message: 'No jobs found', type: 'default'});
          this.pageTitleService.setPageTitle('No jobs found');
        }
        this.jobListings = jobs;
        this.pageTitleService.setPageTitle(`${jobs.length} ${jobTitle ? `${this._capitalizeText(jobTitle)} ` : ' '}${jobs.length > 1 ? 'jobs ' : 'job '}${jobLocation ? `in ${this._capitalizeText(jobLocation)} ` : ''} found`);
      },
      error: (err) => {
        this.jobListings = [];
        this.toasterService.openSnackbar({message: err.error.message, type: 'error'});
      }
    });
  }
}
