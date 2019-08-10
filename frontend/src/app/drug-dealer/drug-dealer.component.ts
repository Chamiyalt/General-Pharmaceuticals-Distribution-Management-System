import { Component, OnInit } from '@angular/core';

import { NgForm } from "@angular/forms";

import { DealersService } from '../dealer.service';

import { ActivatedRoute, ParamMap } from "@angular/router"
import { Dealer } from 'app/dealer.model';


@Component({
  selector: 'app-drug-dealer',
  templateUrl: './drug-dealer.component.html',
  styleUrls: ['./drug-dealer.component.scss']
})





export class DrugDealerComponent implements OnInit {


  isLoading = false;
  dealer: Dealer;
  private mode = 'create';
  private dealerId: string;




  constructor(public dealersService: DealersService, public route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('dealerId')){
        this.mode = 'edit';
        this.dealerId = paramMap.get('dealerId');
        this.isLoading = true;
        this.dealersService.getDealer(this.dealerId)
        .subscribe(dealerData =>{
          this.isLoading = false;
          this.dealer = { id:dealerData._id, name: dealerData.name , email: dealerData.email,tel: dealerData.tel};
        });
      }else{
        this.mode = 'create';
        this.dealerId = null;
      }
    });

  }


  onSaveDealer(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading=true;
    if(this.mode === 'create'){
      this.dealersService.addDealer(form.value.name,form.value.email,form.value.tel);
    }else{
      this.dealersService.updateDealer(this.dealerId,form.value.name,form.value.email,form.value.tel);
    }
    form.resetForm();
  }

}
