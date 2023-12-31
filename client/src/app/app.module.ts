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
import {ToastComponent} from './components/shared/toast/toast.component';
import {JwtTokenInterceptor} from "./interceptors/jwt-token.interceptor";
import {GenericInterceptor} from "./interceptors/generic.interceptor";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatUiModule} from "./modules/mat-ui/mat-ui.module";
import {MatMenuModule} from "@angular/material/menu";
import {JobsListComponent} from "./components/jobs/jobs-list/jobs-list.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import { JobDetailComponent } from './components/jobs/job-detail/job-detail.component';
import {MatChipsModule} from "@angular/material/chips";
import { JobApplicationComponent } from './components/jobs/job-application/job-application.component';
import { OrderConfirmationComponent } from './components/subscription/order-confirmation/order-confirmation.component';
import { OrderPreviewComponent } from './components/subscription/order-preview/order-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    PageNotFoundComponent,
    ToastComponent,
    JobsListComponent,
    JobDetailComponent,
    JobApplicationComponent,
    OrderConfirmationComponent,
    OrderPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatUiModule,
    MatMenuModule,
    MatPaginatorModule,
    MatChipsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: GenericInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
