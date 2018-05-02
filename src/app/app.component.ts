import { Component, Input, ElementRef, Injectable, Inject } from '@angular/core';
import { Services } from '@angular/core/src/view';

import { AuthService } from '../auth/auth.service';
import { TokenReponse } from '../classes/TokenResponse';
import { DWXF7BusinessClass } from '../classes/DWXF7BusinessClass';
import { BusinessclassDataService } from '../services/businessclass-data.service';
import { LansaLoaderComponent } from './lansa-loader/lansa-loader.component'

export class UserData {
    //
    public UserId:      string
    public SessionId:   string
    public Email:       string
    public UserName:    string
    public APSubjectId: string
    public APGroupId:   string
    public QuoteId:     string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

    title = 'app';
    quoteid: string;
    username: string;
    newUser: UserData; 
    token: TokenReponse

    constructor(private elementRef: ElementRef, 
				private authService: AuthService,
				private classService : BusinessclassDataService) {

        //@ViewChild('username') this.username:  ElementRef; 
        //this.username = this.elementRef.nativeElement.getAttribute('username');
        //this.quoteid  = this.elementRef.nativeElement.getAttribute('quoteid');
        //var qid = parseFloat((<HTMLInputElement>document.getElementById('quoteid')).value);


		if (<HTMLInputElement>document.getElementById('userdata') != null) {
			var userdata = (<HTMLInputElement>document.getElementById('userdata')).value;

			////this.newUser = JSON.parse(userdata);
			this.token = JSON.parse(userdata);
			console.log('App component Username ID: ' + this.token.UserId);
			console.log('App component SesssionID: ' + this.token.SessionId);
			console.log('App Component Email: ' + this.token.Email);
			console.log('App component UserName: ' + this.token.UserName);
			console.log('App Component APSubjectId: ' + this.token.APSubjectId);
			console.log('App Component APGroupId: ' + this.token.APGroupId);
			console.log('App Component QuoteId: ' + this.token.QuoteId);
			console.log('App component TOKEN: ' + this.token.token);
			console.log('App component Expiration: ' + this.token.expiration);

		}
        
        authService.setAuth(this.token);

		//
		//document.getElementById('userdata').remove();

	}
}
