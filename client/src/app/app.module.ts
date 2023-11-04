import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './components/generic/home/home.component';
import {RegisterComponent} from './components/account/register/register.component';
import {LoginComponent} from './components/account/login/login.component';
import {ProfileComponent} from './components/account/profile/profile.component';
import {PageNotFoundComponent} from './components/generic/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JobsListComponent} from './components/jobs/jobs-list/jobs-list.component';
import {ToastComponent} from './components/shared/toast/toast.component';
import {JwtTokenInterceptor} from "./interceptors/jwt-token.interceptor";
import {GenericInterceptor} from "./interceptors/generic.interceptor";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PostJobComponent} from "./components/jobs/post-job/post-job.component";
import {MatUiModule} from "./modules/mat-ui/mat-ui.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    PageNotFoundComponent,
    JobsListComponent,
    ToastComponent,
    PostJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatUiModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: GenericInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
