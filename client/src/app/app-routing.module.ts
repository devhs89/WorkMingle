import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {PageNotFoundComponent} from "./components/pages/page-not-found/page-not-found.component";
import {JobsListComponent} from "./components/pages/jobs-list/jobs-list.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {authenticationGuard} from "./gaurds/authentication.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', canActivate: [authenticationGuard], component: ProfileComponent},
  {path: 'jobs', canActivate: [authenticationGuard], component: JobsListComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
