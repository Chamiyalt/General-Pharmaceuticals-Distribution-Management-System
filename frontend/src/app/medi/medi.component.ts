import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Subscription } from 'rxjs';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { MedisService } from '../medis.service';

import { ActivatedRoute, ParamMap } from "@angular/router"
import { Medi } from 'app/medi.model';
import * as $ from "jquery";


@Component({
  selector: 'app-medi',
  templateUrl: './medi.component.html',
  styleUrls: ['./medi.component.css']
})
export class MediComponent implements OnInit {

  // constructor() { }
  @ViewChild('closeBtn') closeBtn: ElementRef;

  isLoading = false;
  medi: Medi;
  private mode = 'create';
  private mediId: string;


  medis: Medi[] = [];
  private medisSub: Subscription;
  // isLoading = false;


  constructor(public medisService: MedisService, public route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('mediId')){
        this.mode = 'edit';
        this.mediId = paramMap.get('mediId');
        this.isLoading = true;
        this.medisService.getMedi(this.mediId)
        .subscribe(mediData =>{
          this.isLoading = false;
          this.medi = { id:mediData._id, Drug: mediData.Drug , category: mediData.category,code: mediData.code};
        });
      }else{
        this.mode = 'create';
        this.mediId = null;
      }
    });


    this.isLoading = true;
    this.medisService.getMedis();
    this.medisSub = this.medisService.getMediUpdateListener()
      .subscribe((medis: Medi[]) => {
        this.isLoading = false;
        this.medis = medis;
      });




  }


  onSaveMedi(form: NgForm) {
    this.closeModal();
    if (form.invalid) {
      return;
    }
    this.isLoading=true;
    if(this.mode === 'create'){
      this.medisService.addMedi(form.value.Drug,form.value.category,form.value.code);
    }else{
      this.medisService.updateMedi(this.mediId,form.value.Drug,form.value.category,form.value.code);
    }
    form.resetForm();
  }


  onDelete(mediId: string) {
    this.medisService.deleteMedi(mediId);
  }

  ngOnDestroy() {
    this.medisSub.unsubscribe();
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}
