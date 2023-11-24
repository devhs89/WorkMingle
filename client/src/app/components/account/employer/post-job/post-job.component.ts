import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PageTitleService} from "../../../../services/page-title.service";
import {EmployerFeaturesService} from "../../../../services/employer-features.service";
import {ToasterService} from "../../../../services/toaster.service";
import {ActivatedRoute} from "@angular/router";
import {JobsService} from "../../../../services/jobs.service";
import {take} from "rxjs";

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  @ViewChild('jobFormDirective') jobFormDirective: any;
  jobForm: FormGroup;
  titleCtrl: FormControl = new FormControl('', Validators.required);
  companyCtrl: FormControl = new FormControl('', Validators.required);
  locationCtrl: FormControl = new FormControl('', Validators.required);
  descriptionCtrl: FormControl = new FormControl('', Validators.required);
  salaryCtrl: FormControl = new FormControl('');

  constructor(private formBuilder: FormBuilder, pageService: PageTitleService, private jobsService: JobsService, private employerFeaturesService: EmployerFeaturesService, private toasterService: ToasterService, private activatedRoute: ActivatedRoute) {
    pageService.setWindowTitle('Post Job');
    pageService.setPageTitle('Advertise a Job');
    this.jobForm = this.formBuilder.group({
      title: this.titleCtrl,
      company: this.companyCtrl,
      location: this.locationCtrl,
      description: this.descriptionCtrl,
      salary: this.salaryCtrl
    });
  }

  onPjSubmit() {
    if (this.jobForm.valid) {
      const jobData = this.jobForm.value;
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

  ngOnInit(): void {
    const _id = this.activatedRoute.snapshot.queryParams['id'];
    if (_id) {
      this.jobsService.showJob({jobAdvertId: _id}).pipe(take(1)).subscribe({
        next: (resp) => this.jobForm.patchValue(resp),
        error: (err) => this.toasterService.openSnackbar({message: err.error.message, type: 'error'})
      });
    }
  }
}
