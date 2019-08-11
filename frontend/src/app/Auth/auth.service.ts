import {Injectable} from '@angular/core';
import { AuthData } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthDataService {
private token: string;
private isAuthenticated = false;
  constructor(private http: HttpClient , private router: Router){}


  private authStateListner = new Subject<boolean>();

  getAuthStatusListner(){
    return this.authStateListner.asObservable();
  }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated ;
  }

  createUser(email:string,password:string ){
    const authData:AuthData ={email:email,password: password};
    this.http.post('http://localhost:3000/api/users/signup',authData).subscribe((response)=>{
      console.log(response['message']);
      alert(response['message']);
    });
  }

  logout(){

    this.token = null;
    this.isAuthenticated = false;
    this.authStateListner.next(false);
    this.router.navigate(['/']);
  }

  onlogin(email: string, password: string){
    const authData: AuthData ={email:email,password: password};
    this.http.post<{token: string}>('http://localhost:3000/api/users/signin',authData).subscribe((response)=>{
      const token = response.token;
      console.log(token);
      this.token=token;
      if(token){
        this.isAuthenticated = true;
        this.authStateListner.next(true);
        this.router.navigate(['/']);
      }

    });

  }

}

