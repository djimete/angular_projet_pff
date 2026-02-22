import { Injectable } from '@angular/core';
import {InscriptionRequest, LoginRequest, LoginResponse, User} from '../models';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  register(request:InscriptionRequest):Observable<void>{
    const url="http://localhost:8084/api/inscription";
    const headers :HttpHeaders=new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<void>(url,request,{headers})
  }

  verifieEmailExiste(email:string):Observable<void>{
    const url=`http://localhost:8084/api/auth/verifieEmail/${email}`;
    return this.httpClient.get<void>(url)
  }

  authentification(request:LoginRequest):Observable<LoginResponse>{
    const url="http://localhost:8084/api/auth/login";
    const headers :HttpHeaders=new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<LoginResponse>(url,request,{headers})
  }

  saveToken(req:LoginResponse){
    localStorage.setItem("USER_TOKEN",req.token);
    localStorage.setItem("USER_INFOS",JSON.stringify(req.user))
  }

  getToken(){
    return localStorage.getItem("USER_TOKEN")
  }

  getUser():User|null{
    const userString = localStorage.getItem("USER_INFOS");
    if(userString){
      return JSON.parse(userString);
    }
    return null;
  }

  deconnection() {
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("USER_INFOS");
  }
}
