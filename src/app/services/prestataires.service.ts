import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PrestatairesService {

  constructor(private httpClient:HttpClient) { }

  getPrestataires(metier:string):Observable<User[]>{
    const url=`http://localhost:8084/api/prestataires/metiers/${metier}`;
    return this.httpClient.get<User[]>(url);
  }
}
