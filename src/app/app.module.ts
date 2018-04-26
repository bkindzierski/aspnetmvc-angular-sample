import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from '../services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
	  BrowserModule,
	  RouterModule,
	  HttpModule,
	  HttpClientModule
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
