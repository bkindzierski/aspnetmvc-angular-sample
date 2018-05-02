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


}
