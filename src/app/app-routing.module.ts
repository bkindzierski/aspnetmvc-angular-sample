import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthGuard } from './auth.guard';
import { BusinessClassComponent } from '../../src/app/business-class/business-class.component';
import { ErrorRedirectComponent } from '../../src/app/error-redirect/error-redirect.component';

const routes: Routes = [

	//{ path: 'classlist', component: BusinessClassComponent },
	{
		path: 'classlist',
		component: BusinessClassComponent,
		canActivate: [AuthGuard],
		data: { roles: ['Admin', 'User'] }
	},
	
	{ path: 'unauthorized', component: ErrorRedirectComponent },
	{ path: 'api/LansaAuthenticate', component: AppComponent },
	{ path: '~/', redirectTo: 'AppComponent', pathMatch: 'full' },
	{ path: '**', redirectTo: 'AppComponent', pathMatch: 'full' },
	//children: []
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
