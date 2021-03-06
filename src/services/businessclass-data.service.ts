import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";
import 'rxjs/Rx';

import { AuthService } from '../auth/auth.service';
import { TokenReponse } from '../classes/TokenResponse';
import { HttpResponse } from "selenium-webdriver/http";
import { DWXF7BusinessClass } from '../classes/DWXF7BusinessClass';

@Injectable()
export class BusinessclassDataService {

	  //clientId: string = "MigTokenTest";
	  //_url: string = 'http://dev-net-brn.MIG.local/MigAuthService/api/AuthTokenTest';

	  //behind firewall URL
	  //_url: string = 'http://dev-net-brn.MIG.local/MigAuthService/api/BusinessClass';

	  // middelware URL
	  //_url: string = 'http://dev-net-brn.mig.local:8081/api/BusinessClass';

	  //goes to ProxyHandler Class
	  _url: string = 'http://dev-net-brn.mig.local:8081/api/';


	  constructor(private _http: HttpClient,
				private authServcie: AuthService) { }


	  // ** TOKEN HEADERS GET TEST SERVICE CALL ** //  
	  public getBusinessClassById(id: number): Observable<DWXF7BusinessClass[]> {

		  const httpOptions = {
			  headers: new HttpHeaders({
				  'Content-Type': 'application/json',
				  'RequestPath': 'api/BusinessClass'
			  })
		  };

		   this._http.options('withCredentials: true');
				return this._http.get(this._url + 'ProxyGet', httpOptions)
				//.map(response => <DWXF7BusinessClass[]>response) //<-- with httpclient
				.map((response: Response) => response) //<-- with httpclient
				.do(data => console.log('Return Data: ' + JSON.stringify(data)))
				.catch(this.handleError);
	  }


	  // ** TOKEN HEADERS POST TEST SERVICE CALL ** //  
	  public postNewBusinessClass(newClass: any): Observable<any> {

		
		  const httpOptions = {
			  headers: new HttpHeaders({
				  'Content-Type': 'application/json',
				  'RequestPath': 'api/ProxyPostCall'
				  //'Authorization': 'my-auth-token'
			  })
		  };
			
		  this._http.options('withCredentials: true');
		  return this._http.post(this._url + 'ProxyPostCall', newClass, httpOptions)
			//.map(response => <DWXF7BusinessClass[]>response) //<-- with httpclient
			.map((response: Response) => response) //<-- with httpclient
			//.map((response: Response) => <any[]> response.json()) //<-- with httpclient
			.do(data => console.log('Return Data: ' + JSON.stringify(data)))
			.catch(this.handleError);
	  }

	  //
	  private handleError(error: Response) {
		//console.error('handle Error: ', JSON.stringify(error.toString()));
		console.error('handle Error: ' + error.toString());
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
