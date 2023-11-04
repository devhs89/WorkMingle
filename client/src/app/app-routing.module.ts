import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/generic/home/home.component";
import {RegisterComponent} from "./components/account/register/register.component";
import {LoginComponent} from "./components/account/login/login.component";
import {PageNotFoundComponent} from "./components/generic/page-not-found/page-not-found.component";
import {ProfileComponent} from "./components/account/profile/profile.component";
import {authenticationGuard} from "./gaurds/authentication.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', canActivate: [authenticationGuard], component: ProfileComponent},
  {path: 'employer', component: RegisterComponent},
  {
    path: 'job',
    canMatch: [authenticationGuard],
    loadChildren: () => import('./components/jobs/jobs.module').then((m) => m.JobsModule)
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
