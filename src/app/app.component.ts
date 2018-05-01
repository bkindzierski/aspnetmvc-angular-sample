import { Component, Input, ElementRef, Injectable, Inject } from '@angular/core';
import { Services } from '@angular/core/src/view';

import { AuthService } from '../auth/auth.service';
import { TokenReponse } from '../classes/TokenResponse';
import { DWXF7BusinessClass } from '../classes/DWXF7BusinessClass';
import { BusinessclassDataService } from '../services/businessclass-data.service';


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

// export class TokenReponse {
//    //
//    public UserId: string
//    public SessionId: string
//    public Email: string
//    public UserName: string
//    public APSubjectId: string
//    public APGroupId: string
//    public QuoteId: string
//    public token: string
//    public expiration: string
//}



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
		document.getElementById('userdata').remove();

	}

	// ** ** BDK
	classInfoByid: DWXF7BusinessClass[];
	public getBusinessClassID(id: number) {

		this.classService.getBusinessClassById(id)
			.finally(() => this.ApiGetCheck())
			.subscribe(classInfo => {
				this.classInfoByid = classInfo;
		});
	}

	//finally get call
	public ApiGetCheck() {
				
		console.log('classInfoByid -- : ' + this.classInfoByid);

		for (let entry of this.classInfoByid) {

			console.log('**********************');
			console.log('CLASX: ' + entry.CLASX);
			console.log('RCDID: ' + entry.RCDID);
			console.log('DESC: ' + entry.DESC);

		}	
	}


	// **
	classPostInfo: DWXF7BusinessClass;
	public postNewBusinesClass() {
		
		let newClass = new DWXF7BusinessClass();
		newClass.PRMSTE		= 20;
		newClass.DESC		= 'Beaches - Bathing - Not Commercially Operated';
		newClass.CLASX		= '040072';
		newClass.CLSSEQ		= '01';
		newClass.EFFDTE		= 20180426;
		newClass.ENDDTE		= '0';
		newClass.RNWEFF		= '20070701';
		newClass.RNWEXP		= '0';
		newClass.WEBCLS		= '';
		newClass.REFDSC		= '';
		newClass.REFCLS		= '011234';
		newClass.REFSEQ		= '';
		newClass.MAPCLS		= '';
		newClass.AUTCLS		= '';
		newClass.COVCLS		= '';
		newClass.SICCDE		= '7999';
		newClass.MAPMS		= '';
		newClass.AUTMS		= '';
		newClass.COVMS		= '';
		newClass.MAPDSR		= 'R';
		newClass.AUTDSR		= 'R';
		newClass.PROPDSR	= 'R';
		newClass.GLDSR		= 'R';
		newClass.WCDSR		= 'R';
		newClass.CAUTDSR	= 'R';
		newClass.COVDSR		= 'R';
		newClass.CUPDSR		= 'R';
		newClass.MAPCMT		= '';
		newClass.AUTCMT		= '';
		newClass.PROPCMT	= '';
		newClass.GLCMT		= '';
		newClass.WCCMT		= '';
		newClass.CAUTCMT	= '';
		newClass.COVCMT		= '';
		newClass.CUPCMT		= '';
		newClass.SPCTYP		= '';
		newClass.CLSDED		= '0';
		newClass.RCDID		= 25;

		//
		this.classService.postNewBusinessClass(newClass)
			.finally(() => this.ApiPostCheck())
			.subscribe(classInfo => {
				this.classPostInfo = classInfo;
			});

	}

	//finally post call
	public ApiPostCheck() {

		console.log('classPostInfo -- : ' + this.classPostInfo);
		//
		console.log('POST CALL RETURN');
		console.log('CLASX: ' + this.classPostInfo.CLASX);
		console.log('RCDID: ' + this.classPostInfo.RCDID);
		console.log('DESC: ' + this.classPostInfo.DESC);		
	}

}
