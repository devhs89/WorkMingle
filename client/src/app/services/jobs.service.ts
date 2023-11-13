import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobAdvertResponseInterface} from "../interfaces/job-advert.interface";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private httpClient: HttpClient) {
  }

  allJobs({pageNo, pageLimit = 5}: { pageNo: number, pageLimit: number }): Observable<JobAdvertResponseInterface> {
    return this.httpClient.post('/api/jobs', {
      page: pageNo,
      limit: pageLimit
    }) as Observable<JobAdvertResponseInterface>;
  }

  searchJobs({jobTitle, jobLocation, pageNo, pageLimit = 5}: {
    jobTitle: string,
    jobLocation: string,
    pageNo: number,
    pageLimit: number
  }): Observable<JobAdvertResponseInterface> {
    return this.httpClient.post('/api/jobs/search', {
      jobTitle,
      location: jobLocation,
      page: pageNo,
      limit: pageLimit
    }) as Observable<JobAdvertResponseInterface>;
  }
}
