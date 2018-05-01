import { Component, OnInit } from '@angular/core';


import { AuthService } from '../../auth/auth.service';
import { TokenReponse } from '../../classes/TokenResponse';
import { DWXF7BusinessClass } from '../../classes/DWXF7BusinessClass';
import { BusinessclassDataService } from '../../services/businessclass-data.service';


@Component({
  selector: 'app-lansa-loader',
  templateUrl: './lansa-loader.component.html',
  styleUrls: ['./lansa-loader.component.css']
})
export class LansaLoaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private classService : BusinessclassDataService) { }

  ngOnInit() {
  }

  // ** ** 
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
    newClass.PRMSTE = 20;
    newClass.DESC = 'Beaches - Bathing - Not Commercially Operated';
    newClass.CLASX = '040072';
    newClass.CLSSEQ = '01';
    newClass.EFFDTE = 20180426;
    newClass.ENDDTE = '0';
    newClass.RNWEFF = '20070701';
    newClass.RNWEXP = '0';
    newClass.WEBCLS = '';
    newClass.REFDSC = '';
    newClass.REFCLS = '011234';
    newClass.REFSEQ = '';
    newClass.MAPCLS = '';
    newClass.AUTCLS = '';
    newClass.COVCLS = '';
    newClass.SICCDE = '7999';
    newClass.MAPMS = '';
    newClass.AUTMS = '';
    newClass.COVMS = '';
    newClass.MAPDSR = 'R';
    newClass.AUTDSR = 'R';
    newClass.PROPDSR = 'R';
    newClass.GLDSR = 'R';
    newClass.WCDSR = 'R';
    newClass.CAUTDSR = 'R';
    newClass.COVDSR = 'R';
    newClass.CUPDSR = 'R';
    newClass.MAPCMT = '';
    newClass.AUTCMT = '';
    newClass.PROPCMT = '';
    newClass.GLCMT = '';
    newClass.WCCMT = '';
    newClass.CAUTCMT = '';
    newClass.COVCMT = '';
    newClass.CUPCMT = '';
    newClass.SPCTYP = '';
    newClass.CLSDED = '0';
    newClass.RCDID = 25;

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
