
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
//import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpClientModule, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";
import 'rxjs/Rx';

import { TokenReponse } from '../classes/TokenResponse';
import { HttpResponse } from "selenium-webdriver/http";
import { DWXF7BusinessClass } from '../classes/DWXF7BusinessClass';

@Injectable()
export class AuthService {

	authKey: string = "auth";

	constructor(private _http: HttpClient,
		@Inject(PLATFORM_ID) private platformId: any) {
	}

	// performs the logout
	logout(): boolean {
		this.setAuth(null);
		return true;
	}

	// Persist auth into localStorage or removes it if a NULL argument is given
	setAuth(auth: TokenReponse | null): boolean {

		if (isPlatformBrowser(this.platformId)) {
			if (auth) {
				//console.log('auth data: ' + auth.token);
				localStorage.setItem(
					this.authKey,
					JSON.stringify(auth));
			}
			else {
				localStorage.removeItem(this.authKey);
			}
		}
		return true;
	}

	// Retrieves the auth JSON object (or NULL if none)
	getAuth(): TokenReponse | null {

		//console.log('getAuth()....');
		if (isPlatformBrowser(this.platformId)) {

			var i = localStorage.getItem(this.authKey);
			//console.log('local storage get item: ' + i);
			if (i) {
				return JSON.parse(i);
			}
		}
		return null;
	}

	// Returns TRUE if the user is logged in, FALSE otherwise.
	isLoggedIn(): boolean {

		if (isPlatformBrowser(this.platformId)) {
			return localStorage.getItem(this.authKey) != null;
		}
		return false;
	}

	//
	public isInRole(guardRoles: Array<string>): boolean {
		let result: boolean = false;
		let token = this.getAuth();
		if (token == null) { return false;}

		let parseToken = this.parseJwt(token.token);

		let roles = parseToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as (Array<string>);
		console.log('Token roles: ' + roles);

		if (guardRoles.some(function (v) {
			console.log("IsInRoles: "+ v);
			if (roles.indexOf(v) >= 0) {
				return true;
			}
		})) {
			result = true;
		}
		//
		return result;
	}

	//TypeError: t.split is not a function
	parseJwt(token) {
		//var base64Url = token[1];
		console.log("AuthService Parsed token: " + token);
		var base64Url = (<string>token).split('.')[1];
		// console.log(base64Url);
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		//  console.log("final:"+base64);
		return JSON.parse(window.atob(base64));
	};

}
