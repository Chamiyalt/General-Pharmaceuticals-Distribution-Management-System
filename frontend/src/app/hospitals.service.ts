import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { Hospital } from "./hospital.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class HospitalsService {
  private hospitals: Hospital[] = [];
  private hospitalsUpdated = new Subject<Hospital[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getHospitals() {
    this.http
      .get<{ message: string; hospitals: any }>(
        "http://localhost:3000/api/hospitals"
      )
      .pipe(map((hospitalData) => {
        return hospitalData.hospitals.map(hospital => {
          return {
            Hname: hospital.Hname,
            Dirname: hospital.Dirname,
            address: hospital.address,
            city: hospital.city,
            content: hospital.content,
            id: hospital._id
          };
        });
      }))
      .subscribe(transformedHospitals => {
        this.hospitals = transformedHospitals;
        this.hospitalsUpdated.next([...this.hospitals]);
      });
  }

  getHospitalUpdateListener() {
    return this.hospitalsUpdated.asObservable();
  }

  //fetching the post to edit
  getHospital(id: string){
   return this.http.get<{_id: string , Hname: string , Dirname: string ,address: string, city: string, content: string }>(
     "http://localhost:3000/api/hospitals/" + id);
  }


  addHospital(Hname: string,Dirname: string,address: string, city: string, content: string) {
    const hospital: Hospital = { id: null, Hname: Hname, Dirname: Dirname,address:address,city:city, content: content };
   this.http
      .post<{ message: string, hospitalId: string }>("http://localhost:3000/api/hospitals", hospital)
      .subscribe(responseData => {
        const id = responseData.hospitalId;
        hospital.id = id;
        this.hospitals.push(hospital);
        this.hospitalsUpdated.next([...this.hospitals]);
        this.router.navigate(["/"]);
      });
  }

  updateHospital(id: string, Hname: string,Dirname: string,address: string,city: string, content: string){
    console.log('asdsadasdasd')
    const hospital: Hospital = { id: id,Hname: Hname,Dirname: Dirname,address:address,city:city,content: content};
      this.http.put("http://localhost:3000/api/hospitals/" + id, hospital)
      .subscribe(response => {
        const updatedHospitals = [...this.hospitals];
        const oldHospitalIndex = updatedHospitals.findIndex( p => p.id === hospital.id);
        updatedHospitals[oldHospitalIndex] = hospital;
        this.hospitals = updatedHospitals;
        this.hospitalsUpdated.next([...this.hospitals]);
        this.router.navigate(["/"]);
      });
      console.log(hospital);
  }

  deleteHospital(hospitalId: string) {
    this.http.delete("http://localhost:3000/api/hospitals/" + hospitalId)
      .subscribe(() => {
        const updatedHospitals = this.hospitals.filter(hospital => hospital.id !==hospitalId);
        this.hospitals = updatedHospitals;
        this.hospitalsUpdated.next([...this.hospitals]);
      });
  }
}
