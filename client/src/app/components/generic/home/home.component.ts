import {Component} from '@angular/core';
import {PageTitleService} from "../../../services/page-title.service";
import {FormControl, Validators} from "@angular/forms";
import {JobsService} from "../../../services/jobs.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  jobTitleFormCtrl = new FormControl<unknown>('', [Validators.pattern('^[a-zA-Z0-9\\s]*$')]);
  locationFormCtrl = new FormControl<unknown>('', [Validators.pattern('^[a-zA-Z0-9\\s]*$')]);

  constructor(pageTitleService: PageTitleService, private JobsService: JobsService, private router: Router) {
    pageTitleService.setWindowTitle('Home');
    pageTitleService.setPageTitle('Find Your Dream Job');
  }

  searchJobsBtnHandler() {
    if (this.jobTitleFormCtrl.valid && this.locationFormCtrl.valid) {
      const qParams: { jobTitle?: string, jobLocation?: string } = {};
      if (this.jobTitleFormCtrl.value) qParams.jobTitle = this.jobTitleFormCtrl.value as string;
      if (this.locationFormCtrl.value) qParams.jobLocation = this.locationFormCtrl.value as string;
      this.router.navigate(['/jobs'], {queryParams: qParams});
    }
  }
}
