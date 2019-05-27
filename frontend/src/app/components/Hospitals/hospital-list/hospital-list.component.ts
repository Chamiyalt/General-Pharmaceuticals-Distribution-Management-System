// import { Component, OnInit ,OnDestroy} from '@angular/core';
// import { Hospital } from '../hospital.Model';
// import { HospitalsService } from '../../../hospitals.service';
// import { Subscription } from 'rxjs';


// @Component({
//   selector: 'app-hospital-list',
//   templateUrl: './hospital-list.component.html',
//   styleUrls: ['./hospital-list.component.scss']
// })
// export class HospitalListComponent implements OnInit ,OnDestroy {

//   hospitals: Hospital[] = [];
//   private hospitalsSub: Subscription;
//   isLoading = false;

//   constructor(public hospitalsService: HospitalsService) {}

//   ngOnInit() {
//     this.isLoading=true;
//     this.hospitalsService.getHospitals();
//     this.hospitalsSub = this.hospitalsService.getHospitalUpdateListener()
//       .subscribe((hospitals: Hospital[]) => {
//         this.isLoading = false;
//         this.hospitals= hospitals;
//       });
//   }

//   onDelete(hospitalId: string) {
//     this.hospitalsService.deleteHospital(hospitalId);
//   }

//   ngOnDestroy() {
//     this.hospitalsSub.unsubscribe();
//   }
// }
