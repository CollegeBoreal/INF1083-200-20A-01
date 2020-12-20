
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Country } from "~/app/shared/country";

@Injectable({
    providedIn: "root"
})
export class ApicallService {

    constructor(private httpClient: HttpClient) {}

    searchCountryByName(name: string): Observable<Array<Country>> {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append("Accept", "application/json");
        headers = headers.append(
            "X-RapidAPI-Key",
            "c03163e314mshc926c251e4efeccp177d47jsn837259983c9a"
        );

        return this.httpClient.get(
            `https://restcountries-v1.p.rapidapi.com/capital/` + name,
            {headers}
        ).pipe(
            map((data: Array<Country>) => {
                return data;
            }), catchError((error) => {
                return throwError("Capital not found!");
            })
        );
    }

}
