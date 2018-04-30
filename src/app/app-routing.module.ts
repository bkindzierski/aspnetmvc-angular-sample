import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
	
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
