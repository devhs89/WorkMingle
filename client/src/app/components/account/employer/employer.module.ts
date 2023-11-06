import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OnboardComponent} from './onboard/onboard.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatUiModule} from "../../../modules/mat-ui/mat-ui.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {authorizationGuard} from "../../../interceptors/authorization.guard";

const routes: Routes = [
  {path: 'onboard', component: OnboardComponent},
  {path: 'dashboard', canActivate: [authorizationGuard], component: DashboardComponent},
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
  ]
})
export class EmployerModule {
}
