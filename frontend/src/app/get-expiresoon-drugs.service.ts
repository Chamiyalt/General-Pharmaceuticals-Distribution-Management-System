import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Drug } from "./drug.model";
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetExpiresoonDrugsService {
  private drug: Drug[] = [];
  private drugUpdated = new Subject<Drug[]>();
  constructor(private http: HttpClient, private router: Router) {}

  getDrugs() {
    this.http
      .get<{ message: string; drugs: any }>(
        "http://localhost:3000/api/drugs"
      )
      .pipe(map((drugData) => {
        return drugData.drugs.map((drug: { DrugName: any; Batch: any; ExpiryDate: any; Quentity: any; _id: any; }) => {
          return {
            DrugName: drug.DrugName,
            Batch: drug.Batch,
            ExpiryDate: drug.ExpiryDate,
            Quentity: drug.Quentity,
            id: drug._id
          };
        });
      }))
      .subscribe(transformedMedis => {
        this.drug = transformedMedis;
        this.drugUpdated.next([...this.drug]);
      });
  }

  getDrugUpdateListener() {
    return this.drugUpdated.asObservable();
  }
}
