import {Component} from '@angular/core';
import {PageTitleService} from "../../../services/page-title.service";
import {FormControl, Validators} from "@angular/forms";
import {JobsService} from "../../../services/jobs.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  jobTitleFormCtrl = new FormControl<unknown>('software', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]*$')]);
  locationFormCtrl = new FormControl<unknown>('new york', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]*$')]);

  constructor(pageTitleService: PageTitleService, private JobsService: JobsService) {
    pageTitleService.setWindowTitle('Home');
    pageTitleService.setPageTitle('Find Your Dream Job');
  }

  searchJobs() {
    if (this.jobTitleFormCtrl.valid && this.locationFormCtrl.valid) {
      this.JobsService.searchJobs({
        jobTitle: this.jobTitleFormCtrl.value as string,
        location: this.locationFormCtrl.value as string
      }).subscribe({
        next: (jobAdverts) => {
          console.log(jobAdverts);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
