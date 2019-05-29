import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Medi } from "./medi.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class MedisService {
  private medis: Medi[] = [];
  private medisUpdated = new Subject<Medi[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getMedis() {
    this.http
      .get<{ message: string; medis: any }>(
        "http://localhost:3000/api/medis"
      )
      .pipe(map((mediData) => {
        return mediData.medis.map(medi => {
          return {
            Drug: medi.Drug,
            category: medi.category,
            code: medi.code,
            id: medi._id
          };
        });
      }))
      .subscribe(transformedMedis => {
        this.medis = transformedMedis;
        this.medisUpdated.next([...this.medis]);
      });
  }

  getMediUpdateListener() {
    return this.medisUpdated.asObservable();
  }

  //fetching the post to edit
  getMedi(id: string){
   return this.http.get<{_id: string , Drug: string , catrgory: string ,code: string }>(
     "http://localhost:3000/api/medis/" + id);
  }


  addMedi(Drug: string,category: string,code: string) {
    const medi: Medi = { id: null, Drug: Drug, category: category,code:code};
   this.http
      .post<{ message: string, mediId: string }>("http://localhost:3000/api/medis", medi)
      .subscribe(responseData => {
        const id = responseData.mediId;
        medi.id = id;
        this.medis.push(medi);
        this.medisUpdated.next([...this.medis]);
        this.router.navigate(["/"]);
      });
  }

  updateMedi(id: string,Drug: string,category: string,code: string){
      const medi: Medi = { id: id,Drug: Drug,category: category,code:code};
      this.http.put("http://localhost:3000/api/medis/" + id, medi)
      .subscribe(response => {
        const updatedMedis = [...this.medis];
        const oldMediIndex = updatedMedis.findIndex( p => p.id === medi.id);
        updatedMedis[oldMediIndex] = medi;
        this.medis = updatedMedis;
        this.medisUpdated.next([...this.medis]);
        this.router.navigate(["/"]);
      });
  }

  deleteMedi(mediId: string) {
    this.http.delete("http://localhost:3000/api/medis/" + mediId)
      .subscribe(() => {
        const updatedMedis = this.medis.filter(medi => medi.id !== mediId);
        this.medis = updatedMedis;
        this.medisUpdated.next([...this.medis]);
      });
  }
}
