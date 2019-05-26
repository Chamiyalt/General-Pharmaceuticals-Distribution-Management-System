import { Component, OnInit } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { MedisService } from '../medis.service';

import { ActivatedRoute, ParamMap } from "@angular/router"
import { Medi } from 'app/medi.model';



@Component({
  selector: 'app-medi',
  templateUrl: './medi.component.html',
  styleUrls: ['./medi.component.css']
})
export class MediComponent implements OnInit {

  // constructor() { }


  isLoading = false;
  medi: Medi;
  private mode = 'create';
  private mediId: string;


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
          this.medi = { id:mediData._id, DrugName: mediData.DrugName , category: mediData.category,code: mediData.code};
        });
      }else{
        this.mode = 'create';
        this.mediId = null;
      }
    });

  }


  onSaveMedi(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading=true;
    if(this.mode === 'create'){
      this.medisService.addMedi(form.value.DrugName,form.value.category,form.value.code);
    }else{
      this.medisService.updateMedi(this.mediId,form.value.DrugName,form.value.category,form.value.code);
    }
    form.resetForm();
  }

}
