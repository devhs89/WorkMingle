import {Injectable} from '@angular/core';
import {JobAdvertInterface, JobAdvertResponseInterface} from "../interfaces/job-advert.interface";
import {HttpClient} from "@angular/common/http";
import {SortDirection} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class EmployerFeaturesService {

  constructor(private _httpClient: HttpClient) {
  }

  postedJobs({sortColumn, sortDir, pageLimit, pageIndex}: {
    sortColumn: string,
    sortDir: SortDirection,
    pageLimit: number,
    pageIndex: number
  }) {
    return this._httpClient.post<JobAdvertResponseInterface>('/api/employer/posted-jobs', {
      sortColumn,
      sortDir,
      pageLimit,
      pageIndex
    });
  }

  postJob(jobData: JobAdvertInterface) {
    jobData.datePosted = new Date().toISOString();
    jobData.dateExpires = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();
    return this._httpClient.post<JobAdvertInterface>('/api/employer/post-job', jobData);
  }

  updateJob(jobData: JobAdvertInterface) {
    return this._httpClient.put<JobAdvertInterface>('/api/employer/update-job', jobData);
  }

  deleteJob(jobAdvertId: string) {
    return this._httpClient.post('/api/employer/delete-job', {jobAdvertId: jobAdvertId});
  }
}
