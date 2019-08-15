// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-divisional-drug-quentity',
//   templateUrl: './divisional-drug-quentity.component.html',
//   styleUrls: ['./divisional-drug-quentity.component.scss']
// })
// export class DivisionalDrugQuentityComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }



import { Component, OnInit,OnDestroy,ViewChild, ElementRef  } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { DivisionalQuentity } from '../divisionalQuentity.model';
import { DivisionalsQuentityService } from '../divisionalsQuentity.service';
import { Subscription } from 'rxjs';


import { Spc } from '../spc.model';
import { SpcsService } from '../spcs.service';


import { MedisService } from "app/medis.service";
import { Medi } from "app/medi.model";

import { ActivatedRoute, ParamMap } from "@angular/router"



@Component({
  selector: 'app-divisional-drug-quentity',
  templateUrl: './divisional-drug-quentity.component.html',
  styleUrls: ['./divisional-drug-quentity.component.scss']
})
export class DivisionalDrugQuentityComponent implements OnInit {



  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeEditBtn') closeEditBtn: ElementRef;


  isLoading = false;
  divisionalQuentity: DivisionalQuentity = {
    OutletName : "" ,
    DrugName : "",
    quentity : "",
    id : ""
  }
  private mode = 'create';
  private divisionalQuentityId: string;
  currentDivisionalQuentity;

  divisionalsQuentity: DivisionalQuentity[] = [];
  private divisionalsQuentitySub: Subscription;

  spcs: Spc[] = [];
  private spcsSub: Subscription;

  SpcValue: string;
  DrugValue: string;



  private medisSub: Subscription;
  medis: Medi[] = [];


  constructor(
    public divisionalsQuentityService: DivisionalsQuentityService,
    public spcsService : SpcsService ,
    public medisService:MedisService,
    public route: ActivatedRoute
    ) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('divisionalQuentityId')){
        this.mode = 'edit';
        this.divisionalQuentityId = paramMap.get('divisionalQuentityId');
        this.isLoading = true;
        this.divisionalsQuentityService.getDivisionalQuentity(this.divisionalQuentityId)
        .subscribe(divisionalQuentityData =>{
          this.isLoading = false;
          this.divisionalQuentity = { id:divisionalQuentityData._id, OutletName: divisionalQuentityData.OutletName , DrugName: divisionalQuentityData.DrugName,quentity: divisionalQuentityData.quentity};
        });
      } else {
        this.mode = 'create';
        this.divisionalQuentityId = null;
      }

          //getting Spcs names
    this.isLoading = true;
    this.spcsService.getSpcs();
    this.spcsSub = this.spcsService.getSpcUpdateListener()
      .subscribe((spcs: Spc[]) => {
        this.isLoading = false;
        this.spcs = spcs;
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
    this.divisionalsQuentityService.getDivisionalsQuentity();
    this.divisionalsQuentitySub = this.divisionalsQuentityService.getDivisionalQuentityUpdateListener()
      .subscribe((posts: DivisionalQuentity[]) => {
        this.isLoading = false;
        this.divisionalsQuentity = posts;
      });



  }


  onSaveDivisionalQuentity(form: NgForm) {

    this.closeModal();
    if (form.invalid) {
      return;

    }
    this.isLoading = true;
    if(this.mode === 'create'){
      console.log('supun if ');
      console.log(form.value.OutletName);
      this.divisionalsQuentityService.addDivisionalQuentity(this.SpcValue,this.DrugValue,form.value.quentity);
    }else{


      this.divisionalsQuentityService.updateDivisionalQuentity(this.divisionalQuentityId,form.value.OutletName,form.value.DrugName,form.value.quentity);
    }

    form.resetForm();

  }


  onDelete(postId: string) {
    this.divisionalsQuentityService.deleteDivisionalQuentity(postId);
  }

  ngOnDestroy() {
    this.divisionalsQuentitySub.unsubscribe();
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
    this.closeEditBtn.nativeElement.click();
  }

  getDivisionalQuentityDetails(divisionalQuentityId:string){
    this.divisionalsQuentityService.getDivisionalQuentity(divisionalQuentityId).subscribe((Data)=>{
      this.currentDivisionalQuentity = Data;
      this.divisionalQuentity.OutletName = Data.OutletName
      this.divisionalQuentity.DrugName = Data.DrugName
      this.divisionalQuentity.quentity = Data.quentity
      this.divisionalQuentity.id = Data._id
      console.log(this.divisionalQuentity)
    })
  }

  editDivisionalQuentity(form: NgForm){
    this.closeModal()

    this.isLoading=true;
    this.divisionalsQuentityService.updateDivisionalQuentity(this.divisionalQuentity.id,form.value.OutletName,form.value.DrugName,form.value.quentity);
    form.resetForm();
    this.isLoading = false;
  }

}

