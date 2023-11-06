import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PageTitleService} from "../../../../services/page-title.service";
import {EmployerFeaturesService} from "../../../../services/employer-features.service";

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  jobForm: FormGroup;
  titleCtrl: FormControl = new FormControl('', Validators.required);
  companyCtrl: FormControl = new FormControl('', Validators.required);
  locationCtrl: FormControl = new FormControl('', Validators.required);
  descriptionCtrl: FormControl = new FormControl('', Validators.required);
  salaryCtrl: FormControl = new FormControl('');

  dummyData = {
    title: 'Software Engineer',
    company: 'Google',
    location: 'Mountain View, CA',
    description: 'We are looking for a software engineer to join our team.',
    salary: '100,000'
  };

  constructor(private formBuilder: FormBuilder, pageService: PageTitleService, private employerFeaturesService: EmployerFeaturesService) {
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
          console.log(resp);
        },
        error: () => {
          console.log('Error posting job');
        }
      });
    }
  }

  ngOnInit(): void {
    this.jobForm.patchValue(this.dummyData);
  }
}
