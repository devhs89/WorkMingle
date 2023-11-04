import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OnboardComponent} from './onboard/onboard.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatUiModule} from "../../../modules/mat-ui/mat-ui.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'onboard', component: OnboardComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    OnboardComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatUiModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class EmployerModule {
}
