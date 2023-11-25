import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PageTitleService} from "../../../../services/page-title.service";
import {EmployerFeaturesService} from "../../../../services/employer-features.service";
import {ToasterService} from "../../../../services/toaster.service";
import {ActivatedRoute} from "@angular/router";
import {JobsService} from "../../../../services/jobs.service";
import {take} from "rxjs";
import {JobTypeEnum} from "../../../../interfaces/job-type.enum";
import {JobIndustryEnum} from "../../../../interfaces/job-industry.enum";
import {JobExperienceEnum} from "../../../../interfaces/job-experience.enum";
import {JobEducationEnum} from "../../../../interfaces/job-education.enum";
import {MatChipInputEvent} from "@angular/material/chips";
import {dummyJobs} from "../../../../constants/temp.constant";
import {JobAdvertInterface} from "../../../../interfaces/job-advert.interface";

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  isEditTemplate: boolean = false;
  editJobAdvert: JobAdvertInterface | null = null;
  @ViewChild('jobFormDirective') jobFormDirective: any;
  jobForm: FormGroup;
  titleCtrl: FormControl = new FormControl('', Validators.required);
  companyCtrl: FormControl = new FormControl('', Validators.required);
  locationCtrl: FormControl = new FormControl('', Validators.required);
  descriptionCtrl: FormControl = new FormControl('', Validators.required);
  jobTypeCtrl: FormControl = new FormControl('', [Validators.required]);
  industryCtrl: FormControl = new FormControl('', Validators.required);
  vacanciesCtrl: FormControl = new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]);
  experienceCtrl: FormControl = new FormControl('', Validators.required);
  educationCtrl: FormControl = new FormControl('');
  skillsCtrl: FormControl = new FormControl(null);
  salaryCtrl: FormControl = new FormControl('', [Validators.pattern(/^[\d,_]+$/)]);
  skillsArray: string[] = [];

  constructor(private formBuilder: FormBuilder, private pageService: PageTitleService, private jobsService: JobsService, private employerFeaturesService: EmployerFeaturesService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute) {
    pageService.setWindowTitle('Post Job');
    pageService.setPageTitle('Advertise a Job');
    this.jobForm = this.formBuilder.group({
      title: this.titleCtrl,
      company: this.companyCtrl,
      location: this.locationCtrl,
      description: this.descriptionCtrl,
      jobType: this.jobTypeCtrl,
      industry: this.industryCtrl,
      vacancies: this.vacanciesCtrl,
      experience: this.experienceCtrl,
      education: this.educationCtrl,
      skills: this.skillsCtrl,
      salary: this.salaryCtrl
    });
  }

  ngOnInit(): void {
    const _id = this.activatedRoute.snapshot.queryParams['id'];
    if (_id) {
      this.isEditTemplate = true;
      this.jobsService.showJob({jobAdvertId: _id}).pipe(take(1)).subscribe({
        next: (resp) => {
          this.jobForm.patchValue(resp);
          this.editJobAdvert = resp;
          this.skillsArray = this.editJobAdvert?.skills || [];
          this.pageService.setWindowTitle('Edit Job');
          this.pageService.setPageTitle(`Edit field(s) to make changes to the "${resp.title}" job`);
        },
        error: (err) => this.toasterService.openSnackbar({message: err.error.message, type: 'error'})
      });
    } else {
      this.setDefaultValues();
    }
  }

  onPjSubmit() {
    if (this.jobForm.valid) {
      const jobData = this.jobForm.value;

      if (this.isEditTemplate) {
        jobData._id = this.editJobAdvert?._id;
        jobData.skills = this.skillsArray;
        this.employerFeaturesService.updateJob(jobData).subscribe({
          next: (resp) => {
            this.jobForm.patchValue(resp);
            this.toasterService.openSnackbar({
              message: `Job titled "${resp.title}" updated successfully!`,
              type: 'success'
            });
          },
          error: (err) => {
            for (let controlsKey in this.jobForm.controls) this.jobForm.controls[controlsKey].setErrors({incorrect: true});
            this.toasterService.openSnackbar({message: err.error.message, type: 'error'});
          }
        });
      } else {
        this.employerFeaturesService.postJob(jobData).subscribe({
          next: (resp) => {
            this.jobForm.reset();
            this.jobFormDirective.resetForm();
            this.toasterService.openSnackbar({
              message: `Job titled "${resp.title}" posted successfully!`,
              type: 'success'
            });
          },
          error: (err) => {
            for (let controlsKey in this.jobForm.controls) this.jobForm.controls[controlsKey].setErrors({incorrect: true});
            this.toasterService.openSnackbar({message: err.error.message, type: 'error'});
          }
        });
      }
    }
  }

  setDefaultValues() {
    this.jobForm.patchValue({
      jobType: [JobTypeEnum.fullTime],
      vacancies: 1,
    });
    // For testing purposes
    this.jobForm.patchValue(dummyJobs[5]);
  }

  protected readonly Object = Object;
  protected readonly JobIndustryEnum = JobIndustryEnum;
  protected readonly JobTypeEnum = JobTypeEnum;
  protected readonly JobExperienceEnum = JobExperienceEnum;
  protected readonly JobEducationEnum = JobEducationEnum;

  removeSkill(skill: any) {
    const index = this.skillsArray.indexOf(skill);
    if (index >= 0) this.skillsArray.splice(index, 1);
  }

  addSkill(ev: MatChipInputEvent) {
    const value = (ev.value || '').trim();
    if (value) this.skillsArray.push(value);
    ev.chipInput!.clear();
  }
}
