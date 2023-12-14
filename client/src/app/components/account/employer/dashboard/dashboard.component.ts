import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PageTitleService} from "../../../../services/page-title.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {JobAdvertInterface, JobAdvertResponseInterface} from "../../../../interfaces/job-advert.interface";
import {EmployerFeaturesService} from "../../../../services/employer-features.service";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'location', 'jobType', 'availablePositions', 'dateExpires'];
  postedJobs: JobAdvertInterface[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(pageTitleService: PageTitleService, private employerService: EmployerFeaturesService, private router: Router) {
    pageTitleService.setWindowTitle("Dashboard");
    pageTitleService.setPageTitle("Employer Dashboard");
  }

  ngAfterViewInit() {
    if (!this.paginator || !this.sort) return;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator ? this.paginator.pageIndex = 0 : null));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.employerService.postedJobs({
            sortColumn: this.sort?.active ?? 'dateExpires',
            sortDir: this.sort?.direction ?? 'asc',
            pageLimit: this.paginator?.pageSize ?? 10,
            pageIndex: this.paginator?.pageIndex ?? 0
          }).pipe(catchError(() => of({} as JobAdvertResponseInterface)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.resultsLength = data.docCount;
          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([] as JobAdvertInterface[]);
        })
      )
      .subscribe((data) => (this.postedJobs = data));
  }

  jobRowClickHandler(jobAdvertId: string) {
    this.router.navigate(['/jobs/show'], {queryParams: {id: jobAdvertId}});
  }
}
