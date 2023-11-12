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

  allJobs(): Observable<JobAdvertResponseInterface> {
    return this.httpClient.post('/api/jobs', {}) as Observable<JobAdvertResponseInterface>;
  }

  searchJobs({jobTitle, jobLocation}: {
    jobTitle: string,
    jobLocation: string
  }): Observable<JobAdvertResponseInterface> {
    return this.httpClient.post('/api/jobs/search', {
      jobTitle,
      location: jobLocation
    }) as Observable<JobAdvertResponseInterface>;
  }
}
