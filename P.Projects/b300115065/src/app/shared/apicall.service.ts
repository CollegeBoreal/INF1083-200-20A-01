import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from "rxjs/operators";
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private httpClient: HttpClient) { }

  searchCountryByName(name: string): Observable<Country[]>{
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append(
        'X-RapidAPI-Key',
        'a75e18dfbcmsh6a7b4e1e22577c6p10f79cjsnf1a59453fc5a'
    );
    return this.httpClient.get(
        `https://restcountries-v1.p.rapidapi.com/capital/` + name,
        {headers: headers}
    ).pipe(
        map((data: Country[]) => {
            return data;
        }), catchError( error => {
            return throwError( 'Capital not found!' );
        })
    )
  }
}
