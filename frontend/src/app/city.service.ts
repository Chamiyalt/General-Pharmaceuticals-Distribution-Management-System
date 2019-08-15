import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { City } from "./models/city.model";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private city: City[] = [];
  private cityUpdated = new Subject<City[]>();

  constructor(private http: HttpClient, private router: Router) { }


  getStocks() {
    this.http
      .get<{ message: string; Stocks: any }>(
        "http://localhost:3000/api/stocks"
      )
      .pipe(map((StocksData) => {
        return StocksData.Stocks.map(city => {
          return {
            id: city._id,
            Name : city.Name,
            DrugName :city.DrugName,
            Quentity : city.Quentity,
            preQty :city.preQty


          };
        });
      }))
      .subscribe(transformedMedis => {
        this.city = transformedMedis;
        this.cityUpdated.next([...this.city]);
      });
  }

   //fetching the post to edit
   getStock(id: string){
    return this.http.get<{_id: string , city: string , DrugName: string ,quentity: number ,Hname: string}>(
      "http://localhost:3000/api/stocks/" + id);
   }


  getStockUpdateListener() {
    return this.cityUpdated.asObservable();
  }
}
