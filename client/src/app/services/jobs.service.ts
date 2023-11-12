import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobAdvertInterface} from "../interfaces/job-advert.interface";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private httpClient: HttpClient) {
  }

  allJobs(): Observable<JobAdvertInterface[]> {
    return this.httpClient.post('/api/jobs', {}) as Observable<JobAdvertInterface[]>;
  }

  searchJobs({jobTitle, jobLocation}: { jobTitle: string, jobLocation: string }): Observable<JobAdvertInterface[]> {
    return this.httpClient.post('/api/jobs/search', {
      jobTitle,
      location: jobLocation
    }) as Observable<JobAdvertInterface[]>;
  }
}
