import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private pageTitle = new ReplaySubject<string>(1);
  pageTitle$ = this.pageTitle.asObservable();

  constructor(private titleService: Title) {
  }

  public setPageTitle(title: string): void {
    this.pageTitle.next(title);
  }

  public setWindowTitle(windowTitle: string): void {
    this.titleService.setTitle(`${windowTitle} | WorkMingle`);
  }
}
