import {Injectable} from '@angular/core';
import {JobAdvertInterface, JobAdvertResponseInterface} from "../interfaces/job-advert.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployerFeaturesService {

  constructor(private _httpClient: HttpClient) {
  }

  postedJobs() {
    return this._httpClient.post<JobAdvertResponseInterface>('/api/employer/posted-jobs', {});
  }

  postJob(jobData: JobAdvertInterface) {
    return this._httpClient.post<JobAdvertInterface>('/api/employer/post-job', jobData);
  }

  updateJob(jobData: JobAdvertInterface) {
    return this._httpClient.post<JobAdvertInterface>('/api/employer/update-job', jobData);
  }

  deleteJob(jobAdvertId: string) {
    return this._httpClient.post('/api/employer/delete-job', {jobAdvertId: jobAdvertId});
  }
}
