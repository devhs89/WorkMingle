import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/generic/home/home.component";
import {RegisterComponent} from "./components/account/register/register.component";
import {LoginComponent} from "./components/account/login/login.component";
import {PageNotFoundComponent} from "./components/generic/page-not-found/page-not-found.component";
import {ProfileComponent} from "./components/account/profile/profile.component";
import {authenticationGuard} from "./gaurds/authentication.guard";
import {authorizationGuard} from "./interceptors/authorization.guard";
import {OnboardComponent} from "./components/account/employer/onboard/onboard.component";
import {JobsListComponent} from "./components/jobs/jobs-list/jobs-list.component";
import {JobDetailComponent} from './components/jobs/job-detail/job-detail.component';
import {JobApplicationComponent} from "./components/jobs/job-application/job-application.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', canActivate: [authenticationGuard], component: ProfileComponent},
  {
    path: 'jobs', children: [
      {path: '', component: JobsListComponent, pathMatch: 'full'},
      {path: 'show', component: JobDetailComponent},
      {path: 'apply', component: JobApplicationComponent, canActivate: [authenticationGuard]}
    ]
  },
  {
    path: 'employer',
    children: [
      {path: 'onboard', canActivate: [authenticationGuard], component: OnboardComponent},
      {
        path: 'features',
        canMatch: [authorizationGuard],
        loadChildren: () => import('./components/account/employer/employer.module').then((m) => m.EmployerModule)
      }
    ]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
