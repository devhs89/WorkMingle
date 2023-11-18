import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JobsService} from "../../../services/jobs.service";
import {JobAdvertInterface} from "../../../interfaces/job-advert.interface";
import {faBuilding} from "@fortawesome/free-solid-svg-icons/faBuilding";
import {faCircleDollarToSlot} from "@fortawesome/free-solid-svg-icons/faCircleDollarToSlot";
import {faCalendarPlus} from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import {faHourglassHalf} from "@fortawesome/free-solid-svg-icons/faHourglassHalf";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons/faBriefcase";
import {faBriefcaseClock} from "@fortawesome/free-solid-svg-icons/faBriefcaseClock";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons/faLocationDot";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  private jobId: string | null = null;
  private currentRoute: string | null = null;
  protected jobDetail: JobAdvertInterface | null = null;

  constructor(private activatedRoute: ActivatedRoute, private jobsService: JobsService) {
  }

  ngOnInit(): void {
    this.currentRoute = this.activatedRoute.snapshot.url[0].path;
    this.jobId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.getJobDetail(this.jobId);
  }

  getJobDetail(id: string | null): void {
    if (!id) return;
    this.jobsService.showJob({jobId: id})
      .subscribe((job) => {
        this.jobDetail = job;
      });
  }

  parseDate(date: string): string {
    const dateObj = new Date(date);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  }

  protected readonly faBuilding = faBuilding;
  protected readonly faCircleDollarToSlot = faCircleDollarToSlot;
  protected readonly faCalendarPlus = faCalendarPlus;
  protected readonly faHourglassHalf = faHourglassHalf;
  protected readonly faBriefcase = faBriefcase;
  protected readonly faBriefcaseClock = faBriefcaseClock;

  applyJob(id: any) {

  }

  protected readonly faLocationDot = faLocationDot;
}
