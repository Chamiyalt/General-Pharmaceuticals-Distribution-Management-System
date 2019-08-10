// import { Component, OnInit } from '@angular/core';

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';


import { MedisService } from "../medis.service";
import { Medi } from "app/medi.model";


import { Hospital } from "../hospital.model";
import { HospitalsService } from "../hospitals.service";



@Component({
  selector: 'app-hospital-dist',
  templateUrl: './hospital-dist.component.html',
  styleUrls: ['./hospital-dist.component.scss']
})
export class HospitalDistComponent implements OnInit {




  medis: Medi[] = [];
  private medisSub: Subscription;
  isLoading = false;

  constructor(public medisService: MedisService , public hospitalsService: HospitalsService) {}



  hospitals: Hospital[] = [];
  private hospitalsSub: Subscription;
  //isLoading = false;




  ngOnInit() {
    this.isLoading = true;
    this.medisService.getMedis();
    this.medisSub = this.medisService.getMediUpdateListener()
      .subscribe((medis: Medi[]) => {
        this.isLoading = false;
        this.medis = medis;
      });



      this.isLoading=true;
    this.hospitalsService.getHospitals();
    this.hospitalsSub = this.hospitalsService.getHospitalUpdateListener()
      .subscribe((posts: Hospital[]) => {
        this.isLoading = false;
        this.hospitals = posts;
      });

  }

}
