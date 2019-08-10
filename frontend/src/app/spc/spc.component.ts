import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Spc } from '../spc.model';
import { SpcsService } from '../spcs.service';
import { Subscription } from 'rxjs';

import { ActivatedRoute, ParamMap } from "@angular/router"



@Component({
  selector: 'app-spc',
  templateUrl: './spc.component.html',
  styleUrls: ['./spc.component.css']
})
export class SpcComponent implements OnInit {

  // constructor() { }

  @ViewChild('closeBtn') closeBtn : ElementRef;
  @ViewChild('closeEditBtn') closeeditBtn : ElementRef;


  isLoading = false;
  spc : Spc = {
    OutletName : "" ,
    InChargeName : "",
    Address : "",
    RegNum : "",
    email : "",
    Tel : "",
    id:""
  }
  // spc: Spc;
  private mode = 'create';
  private spcId: string;
  currentSpc;

  spcs: Spc[] = [];
  private spcsSub: Subscription;

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


    this.isLoading = true;
    this.spcsService.getSpcs();
    this.spcsSub = this.spcsService.getSpcUpdateListener()
      .subscribe((posts: Spc[]) => {
        this.isLoading = false;
        this.spcs = posts;
      });

  }


  onSaveSpc(form: NgForm) {
    this.closeModal();
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

  onDelete(postId: string) {
    this.spcsService.deleteSpc(postId);
  }

  ngOnDestroy() {
    this.spcsSub.unsubscribe();
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
    // this.closeEditBtn.nativeElement.click();
  }

  getSpcDetails(spcId:string){
    this.spcsService.getSpc(spcId).subscribe((Data)=>{
      this.currentSpc = Data;
      this.spc.OutletName = Data.OutletName
      this.spc.InChargeName = Data.InChargeName
      this.spc.Address = Data.Address
      this.spc.email = Data.email
      this.spc.RegNum = Data.RegNum
      this.spc.id = Data._id
      console.log(this.spc)
    })
  }

  editSpc(form: NgForm){
    this.closeModal()

    this.isLoading=true;
    this.spcsService.updateSpc(this.spc.id,form.value.OutletName,form.value.InChargeName,form.value.Address,form.value.RegNum,form.value.email,form.value.Tel);
    form.resetForm();
    this.isLoading = false;
  }




}
