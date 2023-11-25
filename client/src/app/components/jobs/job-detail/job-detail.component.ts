import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JobsService} from "../../../services/jobs.service";
import {JobAdvertInterface} from "../../../interfaces/job-advert.interface";
import {faBuilding} from "@fortawesome/free-solid-svg-icons/faBuilding";
import {faCircleDollarToSlot} from "@fortawesome/free-solid-svg-icons/faCircleDollarToSlot";
import {faCalendarPlus} from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import {faHourglassHalf} from "@fortawesome/free-solid-svg-icons/faHourglassHalf";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons/faBriefcase";
import {faBriefcaseClock} from "@fortawesome/free-solid-svg-icons/faBriefcaseClock";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons/faLocationDot";
import {AccountService} from "../../../services/account.service";
import {take} from "rxjs";
import {verifyAppRole} from "../../../helpers/verify-auth-token.helper";
import {appRoles} from "../../../constants/app-roles.constant";
import {EmployerFeaturesService} from "../../../services/employer-features.service";
import {ToasterService} from "../../../services/toaster.service";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  private jobAdvertId: string | null = null;
  private currentRoute: string | null = null;
  protected jobDetail: JobAdvertInterface | null = null;

  constructor(private activatedRoute: ActivatedRoute, private jobsService: JobsService, protected accountService: AccountService, private router: Router, private employerFeaturesService: EmployerFeaturesService, private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.currentRoute = this.activatedRoute.snapshot.url[0].path;
    this.jobAdvertId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.getJobDetail(this.jobAdvertId);
  }

  getJobDetail(id: string | null): void {
    if (!id) return;
    this.jobsService.showJob({jobAdvertId: id})
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

  protected readonly faLocationDot = faLocationDot;

  isAppRole(appRole: string): boolean {
    let valid = false;
    this.accountService.authResponse$.pipe(take(1)).subscribe({
      next: (resp) => {
        if (resp) valid = verifyAppRole(resp, appRole);
      }
    });
    return valid;
  }

  onEditJobHandler() {
    this.router.navigate(['employer', 'features', 'edit-job'], {queryParams: {id: this.jobAdvertId}});
  }

  onDeleteJobHolder() {
    if (!this.jobAdvertId) return;
    this.employerFeaturesService.deleteJob(this.jobAdvertId).pipe(take(1))
      .subscribe({
        next: () => this.router.navigate(['employer', 'features', 'dashboard']).then(() => {
            this.toasterService.openSnackbar({message: `${this.jobDetail?.title} job has been deleted`, type: 'success'});
          }
        ),
        error: (err) => this.toasterService.openSnackbar({message: err.error.message, type: 'error'})
      });
  }

  protected readonly appRoles = appRoles;
}
