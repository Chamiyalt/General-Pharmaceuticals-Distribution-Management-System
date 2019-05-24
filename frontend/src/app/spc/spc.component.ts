//import { Component, OnInit } from '@angular/core';




import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Spc } from "../spc.model";
import {SpcsService } from "../spcs.service";

@Component({
  selector: 'app-spc',
  templateUrl: './spc.component.html',
  styleUrls: ['./spc.component.css']
})
export class SpcComponent implements OnInit ,OnDestroy {

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

