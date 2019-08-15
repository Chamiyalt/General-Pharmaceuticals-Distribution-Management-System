
import * as Chartist from 'chartist';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { Component, OnInit,OnDestroy,ViewChild, ElementRef  } from '@angular/core';

// import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Subscription } from 'rxjs';

import { Dashboard } from '../dashboard.model';
import { DashboardsService } from '../dashboard.service';


import { MedisService } from "app/medis.service";
import { Medi } from "app/medi.model";

import { SpcsService } from '../spcs.service';
import { Spc } from "app/spc.model";

import { DrugsService } from '../drugs.service';
import { Drug } from "app/drug.model";


import { HospitalQuentity } from '../hospitalQuentity.model';
import { HospitalsQuentityService } from '../hospitalsQuentity.service';


import { ActivatedRoute, ParamMap } from "@angular/router"









@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  dashboard: Dashboard;
  isLoading = false;
  // form:FormGroup;
  private mode = "create";
  private dashboardId: string;


  idDrugName: string;
  idSpc: string;
  idBatch: string;



  private medisSub: Subscription;
  private spcsSub: Subscription;
  private drugsSub: Subscription;

  medis: Medi[] = [];
  spcs: Spc[] = [];
  drug: Drug[] = [];

  constructor(
    public dashboardsService: DashboardsService,
    public route: ActivatedRoute,
    public medisService: MedisService,
    public spcsService: SpcsService,
    public drugsService: DrugsService,
  ) {}



  //chart here
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];


  //end chart


  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);




      //Drug allocation code

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("dashboardId")) {
        this.mode = "edit";
        this.dashboardId = paramMap.get("dashboardId");
        this.isLoading = true;
        this.dashboardsService.getDashboard(this.dashboardId).subscribe(dashboardData => {
          this.isLoading = false;
          this.dashboard = {
            id: dashboardData._id,
            DrugName: dashboardData.DrugName,
            Batch: dashboardData.Batch,
            Spc: dashboardData.Spc,
            Quentity: dashboardData.Quentity
          };
          // this.form.setValue({
          //   'DrugName': this.drug.DrugName,
          //   'Batch' : this.drug.Batch,
          //   'ExpiryDate' : this.drug.ExpiryDate,
          //   'Quentity' : this.drug.Quentity
          // });
        });

      } else {
        this.mode = 'create';
        this.dashboardId = null;
      }
    });

    //getting Medicine names
    this.isLoading = true;
    this.medisService.getMedis();
    this.medisSub = this.medisService.getMediUpdateListener()
      .subscribe((medis: Medi[]) => {
        this.isLoading = false;
        this.medis = medis;
      });


      //getting Divisional names
    this.isLoading = true;
    this.spcsService.getSpcs();
    this.spcsSub = this.spcsService.getSpcUpdateListener()
      .subscribe((spcs: Spc[]) => {
        this.isLoading = false;
        this.spcs = spcs;
      });

      //getting Batch Numbers
    this.isLoading = true;
    this.drugsService.getDrugs();
    this.drugsSub = this.drugsService.getDrugUpdateListener()
      .subscribe((drugs: Drug[]) => {
        this.isLoading = false;
        this.drug = drugs;
      });
  }


  trnsferMedicine(form:NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.dashboardsService.transferMedicine(this.idDrugName,this.idSpc,form.value.Quentity);
    console.log('ts ok');
     form.resetForm();
    //this.form.reset();
  }

}


export class NgbdProgressbarBasic {
}
