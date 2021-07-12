import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeModel } from '../models/home-model';


const url = "http://localhost:3000/result"

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getHomeResult(): Observable<HomeModel[]> {
    return this.http.get<HomeModel[]>(url)
  }
}
