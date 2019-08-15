import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';


import { Dashboard } from "./dashboard.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class DashboardsService {
  private dashboards: Dashboard[] = [];
  private dashboardsUpdated = new Subject<Dashboard[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getDashboards() {
    this.http
      .get<{ message: string; dashboards: any }>(
        "http://localhost:3000/api/dashboards"
      )
      .pipe(map((dashboardData) => {
        return dashboardData.dashboards.map(dashboard => {
          return {
            DrugName: dashboard.DrugName,
            Batch: dashboard.Batch,
            Spc: dashboard.Spc,
            Quentity: dashboard.Quentity,
            id: dashboard._id
          };
        });
      }))
      .subscribe(transformedDashboards => {
        this.dashboards = transformedDashboards;
        this.dashboardsUpdated.next([...this.dashboards]);
      });
  }

  getDashboardUpdateListener() {
    return this.dashboardsUpdated.asObservable();
  }

  //fetching the post to edit
  getDashboard(id: string){
   return this.http.get<{_id: string , DrugName: string , Batch: string ,Spc: string, Quentity: string}>(
     "http://localhost:3000/api/drugs/" + id);
  }


  addDashboard(DrugName: string,Batch: string,Spc: string, Quentity: string) {
    const dashboard: Dashboard = { id: null, DrugName: DrugName, Batch: Batch,Spc:Spc,Quentity:Quentity};
   this.http
      .post<{ message: string, dashboardId: string }>("http://localhost:3000/api/dashboards", dashboard)
      .subscribe(responseData => {
        const id = responseData.dashboardId;
        dashboard.id = id;
        this.dashboards.push(dashboard);
        this.dashboardsUpdated.next([...this.dashboards]);
        this.router.navigate(["/user-profile"]);
      });
  }

  updateDashboard(id: string, DrugName: string,Batch: string,Spc: string,Quentity: string){
    console.log('asdsadasdasd')
    const dashboard: Dashboard = { id: id,DrugName: DrugName,Batch: Batch,Spc:Spc,Quentity:Quentity};
      this.http.put("http://localhost:3000/api/dashboards/" + id, dashboard)
      .subscribe(response => {
        const updatedDashboards = [...this.dashboards];
        const oldDashboardIndex = updatedDashboards.findIndex( p => p.id === dashboard.id);
        updatedDashboards[oldDashboardIndex] = dashboard;
        this.dashboards = updatedDashboards;
        this.dashboardsUpdated.next([...this.dashboards]);
        this.router.navigate(["/"]);
      });
      console.log(dashboard);
  }

  deleteDashboard(dashboardId: string) {
    console.log(dashboardId + "k");
    this.http.delete("http://localhost:3000/api/dashboards/" + dashboardId)
      .subscribe(() => {
        const updatedDashboards = this.dashboards.filter(dashboard => dashboard.id !== dashboardId);
        this.dashboards = updatedDashboards;
        this.dashboardsUpdated.next([...this.dashboards]);
      });
  }
}
