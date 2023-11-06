import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {JobsListComponent} from "./jobs-list/jobs-list.component";
import {PostJobComponent} from "./post-job/post-job.component";
import {MatUiModule} from "../../modules/mat-ui/mat-ui.module";
import {CommonModule} from "@angular/common";
import {authorizationGuard} from "../../interceptors/authorization.guard";

const routes: Routes = [
  {path: 'post-job', canActivate: [authorizationGuard], component: PostJobComponent},
  {path: '', component: JobsListComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [
    JobsListComponent,
    PostJobComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatUiModule
  ]
})
export class JobsModule {
}
