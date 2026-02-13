import { Injectable } from '@angular/core';
import {InscriptionRequest} from '../models';
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
}
