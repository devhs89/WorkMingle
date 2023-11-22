import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OnboardComponent} from './onboard/onboard.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatUiModule} from "../../../modules/mat-ui/mat-ui.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PostJobComponent} from "./post-job/post-job.component";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

const routes: Routes = [
  {path: 'post-job', component: PostJobComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    OnboardComponent,
    DashboardComponent,
    PostJobComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatUiModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class EmployerModule {
}
