import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from "rxjs/operators";
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class WellnessapicallService {

  constructor(private httpClient: HttpClient) { }
  
  searchCountryByName(name: string): Observable<Product[]>{
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append(
        'X-RapidAPI-Key',
        '----------66c5d468d13p1772a8jsn1e76dfbecc36----------'
    );
    return this.httpClient.get(
        `https://restcountries-v1.p.rapidapi.com/capital/` + name,
        {headers: headers}
    ).pipe(
        map((data: Product[]) => {
            return data;
        }), catchError( error => {
            return throwError( 'Capital not found!' );
        })
    )
  }
}