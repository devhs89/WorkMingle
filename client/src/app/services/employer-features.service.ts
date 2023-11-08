import {Injectable} from '@angular/core';
import {JobAdvertInterface} from "../interfaces/job-advert.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployerFeaturesService {

  constructor(private httpClient: HttpClient) {
  }

  postJob(jobData: JobAdvertInterface) {
    return this.httpClient.post<JobAdvertInterface>('/api/employer/post-job', jobData);
  }
}
