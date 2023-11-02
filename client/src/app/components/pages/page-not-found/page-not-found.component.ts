import {Component, OnInit} from '@angular/core';
import {PageTitleService} from "../../../services/page-title.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private pageTitleService: PageTitleService) {
  }

  ngOnInit(): void {
    this.pageTitleService.setTitle('Page Not Found');
  }
}
