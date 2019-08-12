import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { Drug } from "./drug.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class DrugsService {
  private drugs: Drug[] = [];
  private drugsUpdated = new Subject<Drug[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getDrugs() {
    this.http
      .get<{ message: string; drugs: any }>(
        "http://localhost:3000/api/drugs"
      )
      .pipe(map((drugData) => {
        return drugData.drugs.map(drug => {
          return {
            DrugName: drug.DrugName,
            Batch: drug.Batch,
            ExpiryDate: drug.ExpiryDate,
            Quentity: drug.Quentity,
            id: drug._id
          };
        });
      }))
      .subscribe(transformedDrugs => {
        this.drugs = transformedDrugs;
        this.drugsUpdated.next([...this.drugs]);
      });
  }

  getDrugUpdateListener() {
    return this.drugsUpdated.asObservable();
  }

  //fetching the post to edit
  getDrug(id: string){
   return this.http.get<{_id: string , DrugName: string , Batch: string ,ExpiryDate: Date, Quentity: string}>(
     "http://localhost:3000/api/drugs/" + id);
  }


  addDrug(DrugName: string,Batch: string,ExpiryDate: Date, Quentity: string) {
    const drug: Drug = { id: null, DrugName: DrugName, Batch: Batch,ExpiryDate:ExpiryDate,Quentity:Quentity};
   this.http
      .post<{ message: string, drugId: string }>("http://localhost:3000/api/drugs", drug)
      .subscribe(responseData => {
        const id = responseData.drugId;
        drug.id = id;
        this.drugs.push(drug);
        this.drugsUpdated.next([...this.drugs]);
        this.router.navigate(["/main-drug-table"]);
      });
  }

  updateDrug(id: string, DrugName: string,Batch: string,ExpiryDate: Date,Quentity: string){
    console.log('asdsadasdasd')
    const drug: Drug = { id: id,DrugName: DrugName,Batch: Batch,ExpiryDate:ExpiryDate,Quentity:Quentity};
      this.http.put("http://localhost:3000/api/drugs/" + id, drug)
      .subscribe(response => {
        const updatedDrugs = [...this.drugs];
        const oldDrugIndex = updatedDrugs.findIndex( p => p.id === drug.id);
        updatedDrugs[oldDrugIndex] = drug;
        this.drugs = updatedDrugs;
        this.drugsUpdated.next([...this.drugs]);
        this.router.navigate(["/"]);
      });
      console.log(drug);
  }

  deleteDrug(drugId: string) {
    console.log(drugId + "k");
    this.http.delete("http://localhost:3000/api/drugs/" + drugId)
      .subscribe(() => {
        const updatedDrugs = this.drugs.filter(drug => drug.id !==drugId);
        this.drugs = updatedDrugs;
        this.drugsUpdated.next([...this.drugs]);
      });
  }
}
