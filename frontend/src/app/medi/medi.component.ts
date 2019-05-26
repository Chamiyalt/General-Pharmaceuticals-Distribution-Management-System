import { Component, OnInit } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { HospitalsService } from '../hospitals.service';

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
  private hospitalId: string;


  constructor(public hospitalsService: HospitalsService, public route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('hospitalId')){
        this.mode = 'edit';
        this.hospitalId = paramMap.get('hospitalId');
        this.isLoading = true;
        this.hospitalsService.getHospital(this.hospitalId)
        .subscribe(hospitalData =>{
          this.isLoading = false;
          this.hospital = { id:hospitalData._id, Hname: hospitalData.Hname , Dirname: hospitalData.Dirname,address: hospitalData.address, city: hospitalData.city, content:hospitalData.content };
        });
      }else{
        this.mode = 'create';
        this.hospitalId = null;
      }
    });

  }


  onSaveHospital(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading=true;
    if(this.mode === 'create'){
      this.hospitalsService.addHospital(form.value.Hname,form.value.Dirname,form.value.address,form.value.city,form.value.content);
    }else{
      this.hospitalsService.updateHospital(this.hospitalId,form.value.Hname,form.value.Dirname,form.value.address,form.value.city,form.value.content);
    }
    form.resetForm();
  }

}
