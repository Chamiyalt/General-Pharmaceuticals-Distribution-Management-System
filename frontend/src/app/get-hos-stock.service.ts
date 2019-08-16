import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { hosStock } from "./getHosStock.model.1";
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetHosStockService {

  private hos: hosStock[] = [];
  private hosUpdated = new Subject<hosStock[]>();

  constructor(private http: HttpClient, private router: Router) { }


  getHosStocks() {
    this.http
      .get<{ message: string; hospitalquentities: any }>(
        "http://localhost:3000/api/hospitalquentities"
      )
      .pipe(map((hospitalquentitiesData) => {
        return hospitalquentitiesData.hospitalquentities.map(hosStock => {
          return {
            id: hosStock._id,
            Hname : hosStock.Hname,
            DrugName :hosStock.DrugName,
            quentity : hosStock.quentity,
            preQty :hosStock.preQty,
            city: hosStock.city
           
          };
        });
      }))
      .subscribe(transformedMedis => {
        this.hos = transformedMedis;
        this.hosUpdated.next([...this.hos]);
      });
  }

   //fetching the post to edit
   getHosStock(id: string){
    return this.http.get<{_id: string , city: string , DrugName: string ,quentity: number ,Hname: string}>(
      "http://localhost:3000/api/hospitalquentities/" + id);
   }
 

  getStockUpdateListener() {
    return this.hosUpdated.asObservable();
  }

}
