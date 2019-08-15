import { Component, OnInit} from '@angular/core';
import { AuthDataService } from './Auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authDataService: AuthDataService){}

  ngOnInit(){
    this.authDataService.autoAuthUser();
    

  }

}
