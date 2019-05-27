import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { Spc } from "./spc.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class SpcsService {
  private spcs: Spc[] = [];
  private spcsUpdated = new Subject<Spc[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getSpcs() {
    this.http
      .get<{ message: string; spcs: any }>(
        "http://localhost:3000/api/spcs"
      )
      .pipe(map((spcData) => {
        return spcData.spcs.map(spc => {
          return {
            OutletName: spc.OutletName,
            InChargeName: spc.InChargeName,
            Address: spc.Address,
            RegNum: spc.RegNum,
            Tel: spc.Tel,
            email: spc.email,
            id: spc._id
          };
        });
      }))
      .subscribe(transformedSpcs => {
        this.spcs = transformedSpcs;
        this.spcsUpdated.next([...this.spcs]);
      });
  }

  getSpcUpdateListener() {
    return this.spcsUpdated.asObservable();
  }

  //fetching the post to edit
  getSpc(id: string){
   return this.http.get<{_id: string , OutletName: string , InChargeName: string ,Address: string, RegNum: string, Tel: string,email: string }>(
     "http://localhost:3000/api/spcs/" + id);
  }


  addSpc(OutletName: string , InChargeName: string,Address: string, RegNum: string, Tel: string, email: string) {
    const spc: Spc = { id: null, OutletName: OutletName, InChargeName: InChargeName,Address:Address,RegNum:RegNum, Tel: Tel,email: email };
   this.http
      .post<{ message: string, spcId: string }>("http://localhost:3000/api/spcs", spc)
      .subscribe(responseData => {
        const id = responseData.spcId;
        spc.id = id;
        this.spcs.push(spc);
        this.spcsUpdated.next([...this.spcs]);
        this.router.navigate(["/"]);
      });
  }

  updateSpc(id: string, OutletName: string,InChargeName: string,Address: string,RegNum: string, Tel: string,email:string){
      const spc: Spc = { id: id,OutletName: OutletName,InChargeName: InChargeName,Address:Address,RegNum:RegNum,Tel: Tel,email: email};
      this.http.put("http://localhost:3000/api/spcs/" + id, spc)
      .subscribe(response => {
        const updatedSpcs = [...this.spcs];
        const oldSpcIndex = updatedSpcs.findIndex( p => p.id === spc.id);
        updatedSpcs[oldSpcIndex] = spc;
        this.spcs = updatedSpcs;
        this.spcsUpdated.next([...this.spcs]);
        this.router.navigate(["/"]);
      });
  }

  deleteSpc(spcId: string) {
    this.http.delete("http://localhost:3000/api/spcs/" + spcId)
      .subscribe(() => {
        const updatedSpcs = this.spcs.filter(spc => spc.id !== spcId);
        this.spcs = updatedSpcs;
        this.spcsUpdated.next([...this.spcs]);
      });
  }
}
