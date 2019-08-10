// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-drug-dealerlist',
//   templateUrl: './drug-dealerlist.component.html',
//   styleUrls: ['./drug-dealerlist.component.scss']
// })
// export class DrugDealerlistComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }









//import { Component, OnInit } from '@angular/core';

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';


import { DealersService } from "../dealer.service";
import { Dealer } from "app/dealer.model";

@Component({
  selector: 'app-drug-dealerlist',
  templateUrl: './drug-dealerlist.component.html',
  styleUrls: ['./drug-dealerlist.component.scss']
})
export class DrugDealerlistComponent implements OnInit ,OnDestroy {



  dealers: Dealer[] = [];
  private dealersSub: Subscription;
  isLoading = false;

  constructor(public dealersService: DealersService) {}


  ngOnInit() {
    this.isLoading = true;
    this.dealersService.getDealers();
    this.dealersSub = this.dealersService.getDealerUpdateListener()
      .subscribe((dealers: Dealer[]) => {
        this.isLoading = false;
        this.dealers = dealers;
      });

  }

  onDelete(dealerId: string) {
    this.dealersService.deleteDealer(dealerId);
  }

  ngOnDestroy() {
    this.dealersSub.unsubscribe();
  }

}

