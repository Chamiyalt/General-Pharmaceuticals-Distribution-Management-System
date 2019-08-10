import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Dealer } from "./dealer.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class DealersService {
  private dealers: Dealer[] = [];
  private dealersUpdated = new Subject<Dealer[]>();

  constructor(private http: HttpClient, private router: Router) {}

  //medis = dealers
  //Medi = Dealer
  //medi= dealer

  getDealers() {
    this.http
      .get<{ message: string; dealers: any }>(
        "http://localhost:3000/api/dealers"
      )
      .pipe(map((dealerData) => {
        return dealerData.dealers.map(dealer => {
          return {
            Drug: dealer.Drug,
            category: dealer.category,
            code: dealer.code,
            id: dealer._id
          };
        });
      }))
      .subscribe(transformedDealers => {
        this.dealers = transformedDealers;
        this.dealersUpdated.next([...this.dealers]);
      });
  }

  getDealerUpdateListener() {
    return this.dealersUpdated.asObservable();
  }

  //fetching the post to edit
  getDealer(id: string){
   return this.http.get<{_id: string , name: string , email: string ,tel: string }>(
     "http://localhost:3000/api/dealers/" + id);
  }


  addDealer(name: string,email: string,tel: string) {
    const dealer: Dealer = { id: null, name: name , email: email,tel:tel};
   this.http
      .post<{ message: string, dealerId: string }>("http://localhost:3000/api/dealers", dealer)
      .subscribe(responseData => {
        const id = responseData.dealerId;
        dealer.id = id;
        this.dealers.push(dealer);
        this.dealersUpdated.next([...this.dealers]);
        this.router.navigate(["/"]);
      });
  }

  updateDealer(id: string,name: string,email: string,tel: string){
      const dealer: Dealer = { id: id,name: name,email:email,tel:tel};
      this.http.put("http://localhost:3000/api/dealers/" + id, dealer)
      .subscribe(response => {
        const updatedDealers = [...this.dealers];
        const oldDealerIndex = updatedDealers.findIndex( p => p.id === dealer.id);
        updatedDealers[oldDealerIndex] = dealer;
        this.dealers = updatedDealers;
        this.dealersUpdated.next([...this.dealers]);
        this.router.navigate(["/"]);
      });
  }

  deleteDealer(dealerId: string) {
    this.http.delete("http://localhost:3000/api/dealers/" + dealerId)
      .subscribe(() => {
        const updatedDealers = this.dealers.filter(dealer => dealer.id !== dealerId);
        this.dealers = updatedDealers;
        this.dealersUpdated.next([...this.dealers]);
      });
  }
}
