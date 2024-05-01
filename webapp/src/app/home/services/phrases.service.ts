import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { GetPhrases } from "../interfaces/phrases.interfaces";
import { environments } from "../../../environments/environments";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PhrasesService
{
    constructor(private http: HttpClient) {}

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ localStorage.getItem('token') }`
    });

    public getPhrases(pageSize: number = -1, pageIndex: number = 1): Observable<GetPhrases | null>
    {
        return this.http.get<any>(
            `${ environments.API_GATEWAY }/frases-miticas?PageSize=${ pageSize }&PageIndex=${ pageIndex }`,
            { headers: this.headers }
        )
            .pipe(
                map(response =>
                    {
                        const phrases: GetPhrases = {
                            phrases: response.data.data,
                            totalItems: response.data.totalItems
                         };

                        return phrases;
                    }
                ),
                catchError(() => of(null))
            );
    }
}
