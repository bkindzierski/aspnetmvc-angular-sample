import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from '../services/auth-interceptor.service';
import { BusinessclassDataService } from '../services/businessclass-data.service';
import { BusinessClassComponent } from './business-class/business-class.component';
import { ErrorRedirectComponent } from './error-redirect/error-redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    BusinessClassComponent,
    ErrorRedirectComponent
  ],
  imports: [
		BrowserModule,
		RouterModule,
		HttpModule,
		HttpClientModule,
		AppRoutingModule
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
	  BusinessclassDataService, AuthGuard
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
