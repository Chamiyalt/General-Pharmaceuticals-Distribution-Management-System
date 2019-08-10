import { Component, OnInit } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Spc } from '../spc.model';
import { SpcsService } from '../spcs.service';

import { ActivatedRoute, ParamMap } from "@angular/router"



@Component({
  selector: 'app-spc',
  templateUrl: './spc.component.html',
  styleUrls: ['./spc.component.css']
})
export class SpcComponent implements OnInit {

  // constructor() { }


  isLoading = false;
  spc: Spc;
  private mode = 'create';
  private spcId: string;


  constructor(public spcsService: SpcsService, public route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('spclId')){
        this.mode = 'edit';
        this.spcId = paramMap.get('spcId');
        this.isLoading = true;
        this.spcsService.getSpc(this.spcId)
        .subscribe(spcData =>{
          this.isLoading = false;
          this.spc = { id:spcData._id, OutletName: spcData.OutletName , InChargeName:spcData.InChargeName,Address:spcData.Address, RegNum: spcData.RegNum, Tel:spcData.Tel,email:spcData.email };
        });
      }else{
        this.mode = 'create';
        this.spcId = null;
      }
    });

  }


  onSaveSpc(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading=true;
    if(this.mode === 'create'){
      console.log(form.value.OutletName);
      this.spcsService.addSpc(form.value.OutletName,form.value.InChargeName,form.value.Address,form.value.RegNum,form.value.Tel,form.value.email);
    }else{
      this.spcsService.updateSpc(this.spcId,form.value.OutletName,form.value.InChargeName,form.value.Address,form.value.RegNum,form.value.Tel,form.value.email);
    }
    form.resetForm();
  }

}
