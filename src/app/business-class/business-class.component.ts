import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { DWXF7BusinessClass } from '../../classes/DWXF7BusinessClass';
import { BusinessclassDataService } from '../../services/businessclass-data.service';
import { LansaLoaderComponent } from '../lansa-loader/lansa-loader.component';

@Component({
  selector: 'app-business-class',
  templateUrl: './business-class.component.html',
  styleUrls: ['./business-class.component.css']
})
export class BusinessClassComponent implements OnInit {

  id: number;            
  classInfoByid: DWXF7BusinessClass[];

  constructor(private classService: BusinessclassDataService,
            private _routeParams: ActivatedRoute) { }

  ngOnInit() {
    // my version with a fine exxample below though
    this._routeParams.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number                
      // In a real app: dispatch action to load the details here.
      
    }); // end subscribe to observable

    this.classService.getBusinessClassById(this.id)
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

}
