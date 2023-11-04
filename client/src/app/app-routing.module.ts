import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/generic/home/home.component";
import {RegisterComponent} from "./components/account/register/register.component";
import {LoginComponent} from "./components/account/login/login.component";
import {PageNotFoundComponent} from "./components/generic/page-not-found/page-not-found.component";
import {JobsListComponent} from "./components/jobs/jobs-list/jobs-list.component";
import {ProfileComponent} from "./components/account/profile/profile.component";
import {PostJobComponent} from "./components/jobs/post-job/post-job.component";
import {authenticationGuard} from "./gaurds/authentication.guard";
import {authorizationGuard} from "./gaurds/authorization.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', canActivate: [authenticationGuard], component: ProfileComponent},
  {path: 'jobs', canActivate: [authenticationGuard], component: JobsListComponent},
  {path: 'job/post', canActivate: [authorizationGuard], component: PostJobComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
