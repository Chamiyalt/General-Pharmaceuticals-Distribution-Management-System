import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { HospitalQuentity } from "./hospitalQuentity.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class HospitalsQuentityService {
  private hospitalsQuentity: HospitalQuentity[] = [];
  private hospitalsQuentityUpdated = new Subject<HospitalQuentity[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getHospitalsQuentity() {
    this.http
      .get<{ message: string; hospitalsQuentity: any }>(
        "http://localhost:3000/api/hospitalsQuentity"
      )
      .pipe(map((hospitalQuentityData) => {
        return hospitalQuentityData.hospitalsQuentity.map(hospitalQuentity => {
          return {
            Hname: hospitalQuentity.Hname,
            DrugName: hospitalQuentity.DrugName,
            quentity: hospitalQuentity.quentity,
            id: hospitalQuentity._id
          };
        });
      }))
      .subscribe(transformedHospitalsQuentity => {
        this.hospitalsQuentity = transformedHospitalsQuentity;
        this.hospitalsQuentityUpdated.next([...this.hospitalsQuentity]);
      });
  }

  getHospitalQuentityUpdateListener() {
    return this.hospitalsQuentityUpdated.asObservable();
  }

  //fetching the post to edit
  getHospitalQuentity(id: string){
   return this.http.get<{_id: string , Hname: string , DrugName: string ,quentity: string}>(
     "http://localhost:3000/api/hospitalsQuentity/" + id);
  }


  addHospitalQuentity(Hname: string,DrugName: string,quentity: string) {
    const hospitalQuentity: HospitalQuentity = { id: null, Hname: Hname, DrugName: DrugName,quentity:quentity};
   this.http
      .post<{ message: string, hospitalQuentityId: string }>("http://localhost:3000/api/hospitalsQuentity", hospitalQuentity)
      .subscribe(responseData => {
        const id = responseData.hospitalQuentityId;
        hospitalQuentity.id = id;
        this.hospitalsQuentity.push(hospitalQuentity);
        this.hospitalsQuentityUpdated.next([...this.hospitalsQuentity]);
        this.router.navigate(["/user-profile"]);
      });
  }

  updateHospitalQuentity(id: string, Hname: string,DrugName: string,quentity: string){
    console.log('asdsadasdasd')
    const hospitalQuentity: HospitalQuentity = { id: id,Hname: Hname,DrugName: DrugName,quentity:quentity};
      this.http.put("http://localhost:3000/api/hospitalsQuentity/" + id, hospitalQuentity)
      .subscribe(response => {
        const updatedHospitalsQuentity = [...this.hospitalsQuentity];
        const oldHospitalQuentityIndex = updatedHospitalsQuentity.findIndex( p => p.id === hospitalQuentity.id);
        updatedHospitalsQuentity[oldHospitalQuentityIndex] = hospitalQuentity;
        this.hospitalsQuentity = updatedHospitalsQuentity;
        this.hospitalsQuentityUpdated.next([...this.hospitalsQuentity]);
        this.router.navigate(["/"]);
      });
      console.log(hospitalQuentity);
  }

  deleteHospitalQuentity(hospitalQuentityId: string) {
    this.http.delete("http://localhost:3000/api/hospitalsQuentity/" + hospitalQuentityId)
      .subscribe(() => {
        const updatedHospitalsQuentity = this.hospitalsQuentity.filter(hospitalQuentity => hospitalQuentity.id !==hospitalQuentityId);
        this.hospitalsQuentity = updatedHospitalsQuentity;
        this.hospitalsQuentityUpdated.next([...this.hospitalsQuentity]);
      });
  }
}
