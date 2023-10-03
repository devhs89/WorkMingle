import {Component} from '@angular/core';
import {PageTitleService} from "../../../services/page-title.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  jobTitleFormCtrl = new FormControl<unknown>('', [Validators.required, Validators.pattern('[A-Za-z0-9\s]+')]);
  locationFormCtrl = new FormControl<unknown>('', [Validators.required, Validators.pattern('[A-Za-z0-9\s]+')]);

  constructor(private pageTitleService: PageTitleService) {
    this.pageTitleService.setTitle('Find Your Dream Job');
  }

  searchJobs() {

  }
}
