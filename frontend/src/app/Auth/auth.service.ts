import {Injectable} from '@angular/core';
import { AuthData } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthDataService {
private token: string;
private isAuthenticated = false;
private iam = 'admin';

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

  createUser(email:string,password:string,role: string ){
    const authData:AuthData ={email:email,password: password, role:role};
    this.http.post('http://localhost:3000/api/users/signup',authData).subscribe((response)=>{
      console.log(response['message']);
      alert(response['message']);
    });
  }

  logout(){

    this.token = null;
    this.isAuthenticated = false;
    this.authStateListner.next(false);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  onlogin(email: string, password: string){
    const authData:any={email:email,password: password};
    this.http.post<{token: string, iam: string}>('http://localhost:3000/api/users/signin',authData).subscribe((response)=>{
      const token = response.token;

      const am =response.iam;
      console.log(am);

      console.log(token);
      this.token=token;
      if(token){
        this.isAuthenticated = true;
        this.authStateListner.next(true);
        this.saveAuthData(token);
        this.router.navigate(['/']);
      }

    });

  }

  //Auto auth

  autoAuthUser(){

    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
  }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStateListner.next(true);

  }

private saveAuthData(token:string){
    localStorage.setItem('token',token);


}

private clearAuthData(){
  localStorage.removeItem("token");
}

private getAuthData(){
  const token = localStorage.getItem("token");
  if(!token){
    return;
  }
  return {
    token: token
  }
}

}

