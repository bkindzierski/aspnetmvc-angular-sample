import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthGuard } from '../auth/auth.guard';
import { BusinessClassComponent } from '../app/business-class/business-class.component';
import { ErrorRedirectComponent } from '../app/error-redirect/error-redirect.component';
import { LansaLoaderComponent } from '../app/lansa-loader/lansa-loader.component';

const routes: Routes = [

	//{ path: 'classlist', component: BusinessClassComponent },
	{
		path: 'classlist',
		component: BusinessClassComponent,
		canActivate: [AuthGuard],
		data: { roles: ['Admin', 'User'] }
	},

	{ path: '', component: LansaLoaderComponent },
	{ path: 'api/LansaAuthenticate', component: LansaLoaderComponent }, //<-- needed for angular-callback URL
	{ path: 'unauthorized', component: ErrorRedirectComponent },
	{ path: '~/', redirectTo: 'AppComponent', pathMatch: 'full' },
	{ path: '**', redirectTo: 'AppComponent', pathMatch: 'full' },
	//children: []
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
