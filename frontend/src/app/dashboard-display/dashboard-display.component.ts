// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dashboard-display',
//   templateUrl: './dashboard-display.component.html',
//   styleUrls: ['./dashboard-display.component.scss']
// })
// export class DashboardDisplayComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


// import { Component, OnInit } from '@angular/core';


import { Component, OnInit,OnDestroy,ViewChild, ElementRef  } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Dashboard } from '../dashboard.model';
import { DashboardsService } from '../dashboard.service';

import { Subscription } from 'rxjs';

import { ActivatedRoute, ParamMap } from "@angular/router"


@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.scss']
})
export class DashboardDisplayComponent implements OnInit {



  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeEditBtn') closeEditBtn: ElementRef;


  isLoading = false;
  dashboard: Dashboard = {
    DrugName : "" ,
    Batch : "",
    Spc: '',
    Quentity : "",
    id : ""
  }
  private mode = 'create';
  private dashboardId: string;
  currentDashboard;

  dashboards: Dashboard[] = [];
  private dashboardsSub: Subscription;




  constructor(public dashboardsService: DashboardsService, public route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('dashboardId')){
        this.mode = 'edit';
        this.dashboardId = paramMap.get('dashboardId');
        this.isLoading = true;
        this.dashboardsService.getDashboard(this.dashboardId)
        .subscribe(dashboardData =>{
          this.isLoading = false;
          this.dashboard = { id:dashboardData._id, DrugName: dashboardData.DrugName , Batch: dashboardData.Batch,Spc: dashboardData.Spc, Quentity: dashboardData.Quentity};
        });
      } else {
        this.mode = 'create';
        this.dashboardId = null;
      }
    });



    this.isLoading = true;
    this.dashboardsService.getDashboards();
    this.dashboardsSub = this.dashboardsService.getDashboardUpdateListener()
      .subscribe((subDashboard: Dashboard[]) => {
        this.isLoading = false;
        this.dashboards = subDashboard;
      });



  }


  onSaveDashboard(form: NgForm) {

    this.closeModal();
    if (form.invalid) {
      return;

    }
    this.isLoading = true;
    if(this.mode === 'create'){

      console.log(form.value.Hname);
      this.dashboardsService.addDashboard(form.value.DrugName,form.value.Batch,form.value.Spc,form.value.Quentity);
    }else{


      this.dashboardsService.updateDashboard(this.dashboardId,form.value.DrugName,form.value.Batch,form.value.Batch,form.value.Quentity);
    }

    form.resetForm();

  }


  onDelete(dashboardId: string) {

    this.dashboardsService.deleteDashboard(dashboardId);
  }

  ngOnDestroy() {
    this.dashboardsSub.unsubscribe();
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
    this.closeEditBtn.nativeElement.click();
  }

  getDrugDetails(dashboardId:string){
    this.dashboardsService.getDashboard(dashboardId).subscribe((Data)=>{
      this.currentDashboard = Data;
      this.dashboard.DrugName = Data.DrugName;
      this.dashboard.Batch = Data.Batch;
      this.dashboard.Spc = Data.Spc;
      this.dashboard.Quentity = Data.Quentity;

      this.dashboard.id = Data._id;
      console.log(this.dashboard)
    })
  }

  editDrug(form: NgForm){
    this.closeModal()

    this.isLoading=true;
    this.dashboardsService.updateDashboard(this.dashboard.id,form.value.DrugName,form.value.Batch,form.value.Batch,form.value.Quentity);
    form.resetForm();
    this.isLoading = false;
  }




}

