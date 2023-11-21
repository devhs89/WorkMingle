import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobAdvertInterface, JobAdvertResponseInterface} from "../interfaces/job-advert.interface";

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

  showJob({jobId}: { jobId: string }): Observable<JobAdvertInterface> {
    return this.httpClient.post<JobAdvertInterface>('/api/job/show', {id: jobId});
  }

  applyJob({jobId, firstName, lastName, resume, coverLetter}: {
    jobId: string,
    firstName: string,
    lastName: string,
    resume: ArrayBuffer | string
    coverLetter: ArrayBuffer | string | null
  }): Observable<any> {
    return this.httpClient.post('/api/job/apply', {jobId, firstName, lastName, coverLetter, resume});
  }
}
