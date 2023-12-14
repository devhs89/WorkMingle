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

  showJob({jobAdvertId}: { jobAdvertId: string }): Observable<JobAdvertInterface> {
    return this.httpClient.post<JobAdvertInterface>('/api/job/show', {id: jobAdvertId});
  }

  applyJob({jobAdvertId, firstName, lastName, resume, coverLetter}: {
    jobAdvertId: string,
    firstName: string,
    lastName: string,
    resume: File
    coverLetter: File | null
  }): Observable<any> {
    const formData = new FormData();
    formData.append('jobAdvertId', jobAdvertId);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('resume', resume);
    if (coverLetter) formData.append('coverLetter', coverLetter);
    return this.httpClient.post('/api/job/apply', formData, {headers: {'Content-Type': 'multipart/form-data'}});
  }
}
