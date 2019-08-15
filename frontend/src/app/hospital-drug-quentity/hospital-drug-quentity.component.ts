
import { Component, OnInit,OnDestroy,ViewChild, ElementRef  } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HospitalQuentity } from '../hospitalQuentity.model';
import { HospitalsQuentityService } from '../hospitalsQuentity.service';
import { Subscription } from 'rxjs';

import { Hospital } from '../hospital.model';
import { HospitalsService } from '../hospitals.service';

import { Drug } from '../drug.model';
import { DrugsService } from '../drugs.service';


import { MedisService } from "app/medis.service";
import { Medi } from "app/medi.model";

import { ActivatedRoute, ParamMap } from "@angular/router"



@Component({
  selector: 'app-hospital-drug-quentity',
  templateUrl: './hospital-drug-quentity.component.html',
  styleUrls: ['./hospital-drug-quentity.component.scss']
})
export class HospitalDrugQuentityComponent implements OnInit {


  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeEditBtn') closeEditBtn: ElementRef;


  isLoading = false;
  hospitalQuentity: HospitalQuentity = {
    Hname : "" ,
    DrugName : "",
    quentity : "",
    id : ""
  }
  private mode = 'create';
  private hospitalQuentityId: string;
  currentHostpitalQuentity;

  hospitalsQuentity: HospitalQuentity[] = [];
  private hospitalsQuentitySub: Subscription;

  hospitals: Hospital[] = [];
  private hospitalsSub: Subscription;

  HospitalValue: string;
  DrugValue: string;



  private medisSub: Subscription;
  medis: Medi[] = [];


  constructor(
    public hospitalsQuentityService: HospitalsQuentityService,
    public hospitalsService : HospitalsService ,
    public medisService:MedisService,
    public route: ActivatedRoute
    ) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('hospitalQuentityId')){
        this.mode = 'edit';
        this.hospitalQuentityId = paramMap.get('hospitalQuentityId');
        this.isLoading = true;
        this.hospitalsQuentityService.getHospitalQuentity(this.hospitalQuentityId)
        .subscribe(hospitalQuentityData =>{
          this.isLoading = false;
          this.hospitalQuentity = { id:hospitalQuentityData._id, Hname: hospitalQuentityData.Hname , DrugName: hospitalQuentityData.DrugName,quentity: hospitalQuentityData.quentity};
        });
      } else {
        this.mode = 'create';
        this.hospitalQuentityId = null;
      }

          //getting Hospitals names
    this.isLoading = true;
    this.hospitalsService.getHospitals();
    this.hospitalsSub = this.hospitalsService.getHospitalUpdateListener()
      .subscribe((hospitals: Hospital[]) => {
        this.isLoading = false;
        this.hospitals = hospitals;
      });


      //getting Medicine names
    this.isLoading = true;
    this.medisService.getMedis();
    this.medisSub = this.medisService.getMediUpdateListener()
      .subscribe((medis: Medi[]) => {
        this.isLoading = false;
        this.medis = medis;
      });



    });



    this.isLoading = true;
    this.hospitalsQuentityService.getHospitalsQuentity();
    this.hospitalsQuentitySub = this.hospitalsQuentityService.getHospitalQuentityUpdateListener()
      .subscribe((posts: HospitalQuentity[]) => {
        this.isLoading = false;
        this.hospitalsQuentity = posts;
      });



  }


  onSaveHospitalQuentity(form: NgForm) {

    this.closeModal();
    if (form.invalid) {
      return;

    }
    this.isLoading = true;
    if(this.mode === 'create'){
      console.log('supun if ');
      console.log(form.value.Hname);
      this.hospitalsQuentityService.addHospitalQuentity(this.HospitalValue,this.DrugValue,form.value.quentity);
    }else{


      this.hospitalsQuentityService.updateHospitalQuentity(this.hospitalQuentityId,form.value.Hname,form.value.DrugName,form.value.quentity);
    }

    form.resetForm();

  }


  onDelete(postId: string) {
    this.hospitalsQuentityService.deleteHospitalQuentity(postId);
  }

  ngOnDestroy() {
    this.hospitalsQuentitySub.unsubscribe();
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
    this.closeEditBtn.nativeElement.click();
  }

  getHospitalQuentityDetails(hospitalQuentityId:string){
    this.hospitalsQuentityService.getHospitalQuentity(hospitalQuentityId).subscribe((Data)=>{
      this.currentHostpitalQuentity = Data;
      this.hospitalQuentity.Hname = Data.Hname
      this.hospitalQuentity.DrugName = Data.DrugName
      this.hospitalQuentity.quentity = Data.quentity
      this.hospitalQuentity.id = Data._id
      console.log(this.hospitalQuentity)
    })
  }

  editHospitalQuentity(form: NgForm){
    this.closeModal()

    this.isLoading=true;
    this.hospitalsQuentityService.updateHospitalQuentity(this.hospitalQuentity.id,form.value.Hname,form.value.DrugName,form.value.quentity);
    form.resetForm();
    this.isLoading = false;
  }

}

