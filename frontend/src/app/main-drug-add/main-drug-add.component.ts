
import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { DrugsService } from "../drugs.service";
import { Drug } from "../drug.model";
import { MedisService } from "app/medis.service";
import { Medi } from "app/medi.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-main-drug-add',
  templateUrl: './main-drug-add.component.html',
  styleUrls: ['./main-drug-add.component.scss']
})
export class MainDrugAddComponent implements OnInit {

  drug: Drug;
  isLoading = false;
  // form:FormGroup;
  private mode = "create";
  private drugId: string;

  id: string;


  private medisSub: Subscription;

  medis: Medi[] = [];


  constructor(
    public drugsService: DrugsService,
    public route: ActivatedRoute,
    public medisService:MedisService
  ) {}

  ngOnInit() {

    // this.form = new FormGroup({
    //   'DrugName': new FormControl(null,{
    //     validators : [Validators.required,Validators.minLength(3)]
    // }),
    //   'Batch': new FormControl(null,{
    //     validators: [Validators.required,Validators.minLength(3)]
    //   }),
    //   'ExpiryDate': new FormControl(null,{
    //     validators : [Validators.required,Validators.minLength(3)]
    //   }),
    //   'Quentity' : new FormControl(null,{
    //     validators : [Validators.required,Validators.minLength(3)] })
    //   });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("drugId")) {
        this.mode = "edit";
        this.drugId = paramMap.get("drugId");
        this.isLoading = true;
        this.drugsService.getDrug(this.drugId).subscribe(drugData => {
          this.isLoading = false;
          this.drug = {
            id: drugData._id,
            DrugName: drugData.DrugName,
            Batch: drugData.Batch,
            ExpiryDate: drugData.ExpiryDate,
            Quentity: drugData.Quentity
          };
          // this.form.setValue({
          //   'DrugName': this.drug.DrugName,
          //   'Batch' : this.drug.Batch,
          //   'ExpiryDate' : this.drug.ExpiryDate,
          //   'Quentity' : this.drug.Quentity
          // });
        });

      } else {
        this.mode = 'create';
        this.drugId = null;
      }
    });

    //getting Medicine names
    this.isLoading = true;
    this.medisService.getMedis();
    this.medisSub = this.medisService.getMediUpdateListener()
      .subscribe((medis: Medi[]) => {
        this.isLoading = false;
        this.medis = medis;
      });

  }

  onSaveDrug(form:NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.drugsService.addDrug(this.id, form.value.Batch,form.value.ExpiryDate,form.value.Quentity);
    } else {
      this.drugsService.updateDrug(
        this.drugId,
        form.value.DrugName,
        form.value.Batch,
        form.value.ExpiryDate,
        form.value.Quentity
      );
    }
     form.resetForm();
    //this.form.reset();
  }
}
