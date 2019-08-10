 import { Component, OnInit,OnDestroy,ViewChild, ElementRef  } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Hospital } from '../hospital.model';
import { HospitalsService } from '../hospitals.service';
import { Subscription } from 'rxjs';

import { ActivatedRoute, ParamMap } from "@angular/router"



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit  {


  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeEditBtn') closeEditBtn: ElementRef;


  isLoading = false;
  hospital: Hospital = {
    Hname : "" ,
    Dirname : "",
    address : "",
    content : "",
    city : "",
    id : ""
  }
  private mode = 'create';
  private hospitalId: string;
  currentHostpital;

  hospitals: Hospital[] = [];
  private hospitalsSub: Subscription;




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
      } else {
        this.mode = 'create';
        this.hospitalId = null;
      }
    });



    this.isLoading = true;
    this.hospitalsService.getHospitals();
    this.hospitalsSub = this.hospitalsService.getHospitalUpdateListener()
      .subscribe((posts: Hospital[]) => {
        this.isLoading = false;
        this.hospitals = posts;
      });



  }


  onSaveHospital(form: NgForm) {

    this.closeModal();
    if (form.invalid) {
      return;

    }
    this.isLoading = true;
    if(this.mode === 'create'){
      console.log('supun if ');
      console.log(form.value.Hname);
      this.hospitalsService.addHospital(form.value.Hname,form.value.Dirname,form.value.address,form.value.city,form.value.content);
    }else{


      this.hospitalsService.updateHospital(this.hospitalId,form.value.Hname,form.value.Dirname,form.value.address,form.value.city,form.value.content);
    }

    form.resetForm();

  }


  onDelete(postId: string) {
    this.hospitalsService.deleteHospital(postId);
  }

  ngOnDestroy() {
    this.hospitalsSub.unsubscribe();
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
    this.closeEditBtn.nativeElement.click();
  }

  getHospitalDetails(hospitalId:string){
    this.hospitalsService.getHospital(hospitalId).subscribe((Data)=>{
      this.currentHostpital = Data;
      this.hospital.Hname = Data.Hname
      this.hospital.address = Data.address
      this.hospital.Dirname = Data.Dirname
      this.hospital.city = Data.city
      this.hospital.content = Data.content
      this.hospital.id = Data._id
      console.log(this.hospital)
    })
  }

  editHospital(form: NgForm){
    this.closeModal()

    this.isLoading=true;
    this.hospitalsService.updateHospital(this.hospital.id,form.value.Hname,form.value.Dirname,form.value.address,form.value.city,form.value.content);
    form.resetForm();
    this.isLoading = false;
  }

}
