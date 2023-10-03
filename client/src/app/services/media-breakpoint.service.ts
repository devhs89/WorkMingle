import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class MediaBreakpointService {
  constructor(private breakpointObserver: BreakpointObserver) {
  }

  matchBreakpoint(bp: string): Observable<BreakpointState> {
    return this.breakpointObserver.observe(bp);
  }
}
