import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Country } from './country';
import {catchError, map} from 'rxjs/operators';

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
        '773e87bc32mshc1ece2789d62282p17381fjsn8ea045f3394a'
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

