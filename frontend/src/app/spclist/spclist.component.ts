//import { Component, OnInit } from '@angular/core';




import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Hospital } from "../hospital.model";
import { HospitalsService } from "../hospitals.service";

@Component({
  selector: 'app-user-profile1',
  templateUrl: './user-profile1.component.html',
  styleUrls: ['./user-profile1.component.css']
})
export class UserProfile1Component implements OnInit ,OnDestroy {

  // constructor() { }

  hospitals: Hospital[] = [];
  private hospitalsSub: Subscription;
  isLoading = false;

  constructor(public hospitalsService: HospitalsService) {}


  ngOnInit() {
    this.isLoading=true;
    this.hospitalsService.getHospitals();
    this.hospitalsSub = this.hospitalsService.getHospitalUpdateListener()
      .subscribe((posts: Hospital[]) => {
        this.isLoading = false;
        this.hospitals = posts;
      });

  }

  onDelete(postId: string) {
    this.hospitalsService.deleteHospital(postId);
  }

  ngOnDestroy() {
    this.hospitalsSub.unsubscribe();
  }

}

