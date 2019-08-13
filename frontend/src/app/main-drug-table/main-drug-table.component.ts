// import { Component, OnInit } from '@angular/core';


import { Component, OnInit,OnDestroy,ViewChild, ElementRef  } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Drug } from '../drug.model';
import { DrugsService } from '../drugs.service';
import { Subscription } from 'rxjs';

import { ActivatedRoute, ParamMap } from "@angular/router"


@Component({
  selector: 'app-main-drug-table',
  templateUrl: './main-drug-table.component.html',
  styleUrls: ['./main-drug-table.component.scss']
})
export class MainDrugTableComponent implements OnInit {



  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeEditBtn') closeEditBtn: ElementRef;


  isLoading = false;
  drug: Drug = {
    DrugName : "" ,
    Batch : "",
    ExpiryDate: new Date(Date.now()),
    Quentity : "",
    id : ""
  }
  private mode = 'create';
  private drugId: string;
  currentDrug;

  drugs: Drug[] = [];
  private drugsSub: Subscription;




  constructor(public drugsService: DrugsService, public route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('hospitalId')){
        this.mode = 'edit';
        this.drugId = paramMap.get('drugId');
        this.isLoading = true;
        this.drugsService.getDrug(this.drugId)
        .subscribe(drugData =>{
          this.isLoading = false;
          this.drug = { id:drugData._id, DrugName: drugData.DrugName , Batch: drugData.Batch,ExpiryDate: drugData.ExpiryDate, Quentity: drugData.Quentity};
        });
      } else {
        this.mode = 'create';
        this.drugId = null;
      }
    });



    this.isLoading = true;
    this.drugsService.getDrugs();
    this.drugsSub = this.drugsService.getDrugUpdateListener()
      .subscribe((subDrug: Drug[]) => {
        this.isLoading = false;
        this.drugs = subDrug;
      });



  }


  onSaveDrug(form: NgForm) {

    this.closeModal();
    if (form.invalid) {
      return;

    }
    this.isLoading = true;
    if(this.mode === 'create'){

      console.log(form.value.Hname);
      this.drugsService.addDrug(form.value.DrugName,form.value.Batch,form.value.ExpiryDate,form.value.Quentity);
    }else{


      this.drugsService.updateDrug(this.drugId,form.value.DrugName,form.value.Batch,form.value.ExpiryDate,form.value.Quentity);
    }

    form.resetForm();

  }


  onDelete(drugId: string) {

    this.drugsService.deleteDrug(drugId);
  }

  ngOnDestroy() {
    this.drugsSub.unsubscribe();
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
    this.closeEditBtn.nativeElement.click();
  }

  getDrugDetails(drugId:string){
    this.drugsService.getDrug(drugId).subscribe((Data)=>{
      this.currentDrug = Data;
      this.drug.DrugName = Data.DrugName;
      this.drug.Batch = Data.Batch;
      this.drug.ExpiryDate = Data.ExpiryDate;
      this.drug.Quentity = Data.Quentity;

      this.drug.id = Data._id;
      console.log(this.drug)
    })
  }

  editDrug(form: NgForm){
    this.closeModal()

    this.isLoading=true;
    this.drugsService.updateDrug(this.drug.id,form.value.DrugName,form.value.Batch,form.value.ExpiryDate,form.value.Quentity);
    form.resetForm();
    this.isLoading = false;
  }




}
