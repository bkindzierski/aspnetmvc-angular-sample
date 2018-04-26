
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
//import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';

import { Observable } from "rxjs";
import 'rxjs/Rx';

import { TokenReponse } from '../app/app.component';
import { DWXF7BusinessClass } from '../classes/DWXF7BusinessClass';
import { HttpResponse } from "selenium-webdriver/http";

@Injectable()
export class AuthService {

	authKey: string = "auth";
	//clientId: string = "MigTokenTest";
	//_url: string = 'http://dev-net-brn.MIG.local/MigAuthService/api/AuthTokenTest';
	
	//behind firewall URL
	//_url: string = 'http://dev-net-brn.MIG.local/MigAuthService/api/BusinessClass';

	// middelware URL
	//_url: string = 'http://dev-net-brn.mig.local:8081/api/BusinessClass';
	//goes to ProxyHandler Class
	_url: string = 'http://dev-net-brn.mig.local:8081/api/';


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


	// ** TOKEN HEADERS SERVICE CALL ** //  
	public getBusinessClassById(id: number): Observable<DWXF7BusinessClass[]> {
		
		this._http.options('withCredentials: true');
		return this._http.get(this._url + 'ProxyGetAllBusinessClass')
		//.map(response => <DWXF7BusinessClass[]>response) //<-- with httpclient
		.map((response: Response) => response) //<-- with httpclient
		.do(data => console.log('Return Data: ' + JSON.stringify(data)))
		.catch(this.handleError);
	}

	//
	public postNewBusinessClass(newClass: any): Observable<any> {
		
		this._http.options('withCredentials: true');
		return this._http.post(this._url + 'ProxyPostCall', newClass)
			//.map(response => <DWXF7BusinessClass[]>response) //<-- with httpclient
			.map((response: Response) => response) //<-- with httpclient
			.do(data => console.log('Return Data: ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	//
	private handleError(error: Response) {
		//console.error('handle Error: ', JSON.stringify(error.toString()));
		console.error('handle Error: '+ error.toString());
		return Observable.throw(error.toString() || 'Server error');
	}

	//deprecated
	//let headers = new Headers({ 'Content-Type': 'application/json' });
	//let options = new RequestOptions({ headers: headers });
	//return this._http.get(this._url + '/' + id, options)

	//needed for pass thru authentication IN IIS
	//let options = new RequestOptions({ withCredentials: true });
	// return this._http.get(this._url)//<-- with http
	// .map((response: Response) => <DWXF7BusinessClass[]>response.json()) //<-- with http
	// .do(data => console.log('Return Data: ' + JSON.stringify(data)))
	// //.do(data => console.log('Return Data: ' + data))
	// .catch(this.handleError);

}
