import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { CityService } from "../city.service";
import { City } from "app/models/city.model";
import { Subscription } from 'rxjs';

import { GetHosStockService } from "../get-hos-stock.service";
import { hosStock } from "app/models/getHosStock.model.1";


declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})



export class NotificationsComponent implements OnInit {

 //chart here
 public barChartOptions = {
  scaleShowVerticalLines: false,
  responsive: true
};



//end chart


  city: City[] = [];
  selectedCity: City[];

  cityHos: hosStock[] = [];
  selectedCityHos: hosStock[];

  cityNames =[]
  Values =[]

  hoscityNames =[]
  hosValues =[]

  private CityService: Subscription;

  private GetHosStockService: Subscription;
  isLoading = false;

  sum = 0;
  sum2 = 0;
  constructor(public CityServices: CityService ,public GetHosStockServic: GetHosStockService) { }

  onSearchChange(searchValue: string): void {
    console.log(searchValue);




    this.isLoading = true;
    this.CityServices.getStocks();
    this.CityService = this.CityServices.getStockUpdateListener()
      .subscribe((city: City[]) => {

        this.isLoading = false;
        this.city = [];
        this.cityNames =[]
        this.Values =[]

        this.sum = 0;
        for (var x = 0; x < city.length; x++) {

          if (city[x].DrugName == searchValue) {

            this.sum = this.sum + city[x].Quentity;
            console.log(city);

            let modelData = {
              id: city[x].id,
              Name: city[x].Name,
              DrugName: city[x].DrugName,
              Quentity: city[x].Quentity,
              preQty :city[x].preQty,
              per: Number(Number(city[x].Quentity ) / Number(city[x].preQty) *100).toFixed(2)

            };

            this.cityNames.push(city[x].Name)
            this.Values.push( Number(Number(city[x].Quentity ) / Number(city[x].preQty) *100)).toFixed(2);


            this.city.push(modelData);
          }
        }

      });




  }

  ngOnInit() {




    // this.CityServices.getStock("A");
    // this.CityService = this.CityServices.getStockUpdateListener()
    //   .subscribe((city: City[]) => {

    //     this.isLoading = false;
    //     this.city = city;

    //     console.log(city[0].DrugName+city[0].Quentity+city[0].city)
    //   });

    //   this.CityServices.getStock("A").subscribe((Data)=>{


    //  console.log(Data[0].quentity);
    //   })




  }

  onClickMe() {


      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: this.cityNames,
        series: [
          this.Values

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },

          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 1,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];

      var data = {
        series:  this.Values
      };
      var options = {
        labelInterpolationFnc: function(value) {
          return value[0]
        }
      };
      var sum = function(a, b) { return a + b };




     var websiteViewsChart = new Chartist.Bar('#dailySalesChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }

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

onLoadHos(){



this.isLoading = true;
this.GetHosStockServic.getHosStocks();
this.GetHosStockService = this.GetHosStockServic.getStockUpdateListener()
  .subscribe((hos: hosStock[]) => {

    this.isLoading = false;
    this.cityHos = [];
    this.hoscityNames =[]
    this.hosValues =[]

    this.sum2 = 0;
    for (var x = 0; x < hos.length; x++) {
      console.log(hos);
      if (hos[x].city == $('#DiviSelect').text() && hos[x].DrugName==$('#medName').val() ) {

        this.sum2 = this.sum2 + hos[x].quentity;
        console.log(hos);

        let modelData2 = {
          id: hos[x].id,
          Hname: hos[x].Hname,
          DrugName: hos[x].DrugName,
          quentity: hos[x].quentity,
          preQty :hos[x].preQty,
          per: Number(Number(hos[x].quentity ) / Number(hos[x].preQty) *100).toFixed(2),
          city : hos[x].city

        };

        this.hoscityNames.push(hos[x].Hname)
        this.hosValues.push( Number(Number(hos[x].quentity ) / Number(hos[x].preQty) *100)).toFixed(2);


        this.cityHos.push(modelData2);
      }
    }

  });



  var datawebsiteViewsChart = {
    labels: this.hoscityNames,
    series: [
      this.hosValues

    ]
  };
  var optionswebsiteViewsChart = {
      axisX: {
          showGrid: false
      },

      chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
  };
  var responsiveOptions: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 1,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  var data = {
    series:  this.hosValues
  };
  var options = {
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  };
  var sum = function(a, b) { return a + b };




 var websiteViewsChart = new Chartist.Bar('#hoswiseechart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

  //start animation for the Emails Subscription Chart
  this.startAnimationForBarChart(websiteViewsChart);

}




}
