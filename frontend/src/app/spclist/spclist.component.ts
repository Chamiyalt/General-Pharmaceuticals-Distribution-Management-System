//import { Component, OnInit } from '@angular/core';




import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';


import { SpcsService } from "../spcs.service";
import { Spc } from "app/spc.model";

@Component({
  selector: 'app-spclist',
  templateUrl: './spclist.component.html',
  styleUrls: ['./spclist.component.css']
})
export class SpclistComponent implements OnInit ,OnDestroy {

  // constructor() { }

  spcs: Spc[] = [];
  private spcsSub: Subscription;
  isLoading = false;

  constructor(public spcsService: SpcsService) {}


  ngOnInit() {
    this.isLoading=true;
    this.spcsService.getSpcs();
    this.spcsSub = this.spcsService.getSpcUpdateListener()
      .subscribe((spcs: Spc[]) => {
        this.isLoading = false;
        this.spcs = spcs;
      });

  }

  onDelete(spcId: string) {
    this.spcsService.deleteSpc(spcId);
  }

  ngOnDestroy() {
    this.spcsSub.unsubscribe();
  }

}

