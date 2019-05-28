//import { Component, OnInit } from '@angular/core';




import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';


import { MedisService } from "../medis.service";
import { Medi } from "app/medi.model";

@Component({
  selector: 'app-spclist',
  templateUrl: './spclist.component.html',
  styleUrls: ['./spclist.component.css']
})
export class MedilistComponent implements OnInit ,OnDestroy {

  // constructor() { }

  medis: Medi[] = [];
  private medisSub: Subscription;
  isLoading = false;

  constructor(public medisService: MedisService) {}


  ngOnInit() {
    this.isLoading=true;
    this.medisService.getMedis();
    this.medisSub = this.medisService.getMediUpdateListener()
      .subscribe((medis: Medi[]) => {
        this.isLoading = false;
        this.medis = medis;
      });

  }

  onDelete(mediId: string) {
    this.medisService.deleteMedi(mediId);
  }

  ngOnDestroy() {
    this.medisSub.unsubscribe();
  }

}

