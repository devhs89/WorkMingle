import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {PageNotFoundComponent} from "./components/pages/page-not-found/page-not-found.component";

// const routes: Routes = [
//   {path: 'home', component: HomeComponent},
//   {path: 'register', component: RegisterComponent},
//   {path: 'login', component: LoginComponent},
//   {path: '', component: HomeComponent},
//   {path: '**', component: PageNotFoundComponent}
// ];

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
