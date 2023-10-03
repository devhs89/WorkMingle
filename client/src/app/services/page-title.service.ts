import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private pageTitle = new ReplaySubject<string>(1);
  pageTitle$ = this.pageTitle.asObservable();

  constructor() {
  }

  public setTitle(title: string): void {
    this.pageTitle.next(title);
  }
}
