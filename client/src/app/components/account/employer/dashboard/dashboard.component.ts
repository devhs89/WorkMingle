import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PageTitleService} from "../../../../services/page-title.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {JobAdvertResponseInterface} from "../../../../interfaces/job-advert.interface";
import {EmployerFeaturesService} from "../../../../services/employer-features.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'location', 'jobType', 'availablePositions', 'dateExpires'];
  postedJobs: JobAdvertResponseInterface | null | undefined;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(pageTitleService: PageTitleService, private employerService: EmployerFeaturesService) {
    pageTitleService.setWindowTitle("Dashboard");
    pageTitleService.setPageTitle("Employer Dashboard");
  }

  ngAfterViewInit() {
    this.employerService.postedJobs().subscribe(response => {
      this.postedJobs = response;
      this.isLoadingResults = false;
      this.resultsLength = this.postedJobs.docCount;
      console.log(response);
    });
  }
}
