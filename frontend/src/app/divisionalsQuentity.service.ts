import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { DivisionalQuentity } from "./divisionalQuentity.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class DivisionalsQuentityService {
  private divisionalsQuentity: DivisionalQuentity[] = [];
  private divisionalsQuentityUpdated = new Subject<DivisionalQuentity[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getDivisionalsQuentity() {
    this.http
      .get<{ message: string; divisionalsQuentity: any }>(
        "http://localhost:3000/api/divisionalsQuentity"
      )
      .pipe(map((divisionalQuentityData) => {
        return divisionalQuentityData.divisionalsQuentity.map(divisionalQuentity => {
          return {
            Outletname: divisionalQuentity.Outletname,
            DrugName: divisionalQuentity.DrugName,
            quentity: divisionalQuentity.quentity,
            id: divisionalQuentity._id
          };
        });
      }))
      .subscribe(transformedDivisionalsQuentity => {
        this.divisionalsQuentity = transformedDivisionalsQuentity;
        this.divisionalsQuentityUpdated.next([...this.divisionalsQuentity]);
      });
  }

  getDivisionalQuentityUpdateListener() {
    return this.divisionalsQuentityUpdated.asObservable();
  }

  //fetching the post to edit
  getDivisionalQuentity(id: string){
   return this.http.get<{_id: string , OutletName: string , DrugName: string ,quentity: string}>(
     "http://localhost:3000/api/divisionalsQuentity/" + id);
  }


  addDivisionalQuentity(OutletName: string,DrugName: string,quentity: string) {
    const divisionalQuentity: DivisionalQuentity = { id: null, OutletName: OutletName, DrugName: DrugName,quentity:quentity};
   this.http
      .post<{ message: string, divisionalQuentityId: string }>("http://localhost:3000/api/divisionalsQuentity", divisionalQuentity)
      .subscribe(responseData => {
        const id = responseData.divisionalQuentityId;
        divisionalQuentity.id = id;
        this.divisionalsQuentity.push(divisionalQuentity);
        this.divisionalsQuentityUpdated.next([...this.divisionalsQuentity]);
        this.router.navigate(["/divisional-quentity"]);
      });
  }

  updateDivisionalQuentity(id: string, OutletName: string,DrugName: string,quentity: string){
    console.log('asdsadasdasd')
    const divisionalQuentity: DivisionalQuentity = { id: id,OutletName: OutletName,DrugName: DrugName,quentity:quentity};
      this.http.put("http://localhost:3000/api/divisionalsQuentity/" + id, divisionalQuentity)
      .subscribe(response => {
        const updatedDivisionalsQuentity = [...this.divisionalsQuentity];
        const oldDivisionalQuentityIndex = updatedDivisionalsQuentity.findIndex( p => p.id === divisionalQuentity.id);
        updatedDivisionalsQuentity[oldDivisionalQuentityIndex] = divisionalQuentity;
        this.divisionalsQuentity = updatedDivisionalsQuentity;
        this.divisionalsQuentityUpdated.next([...this.divisionalsQuentity]);
        this.router.navigate(["/"]);
      });
      console.log(divisionalQuentity);
  }

  deleteDivisionalQuentity(divisionalQuentityId: string) {
    this.http.delete("http://localhost:3000/api/divisionalsQuentity/" + divisionalQuentityId)
      .subscribe(() => {
        const updatedDivisionalsQuentity = this.divisionalsQuentity.filter(divisionalQuentity => divisionalQuentity.id !==divisionalQuentityId);
        this.divisionalsQuentity = updatedDivisionalsQuentity;
        this.divisionalsQuentityUpdated.next([...this.divisionalsQuentity]);
      });
  }
}
