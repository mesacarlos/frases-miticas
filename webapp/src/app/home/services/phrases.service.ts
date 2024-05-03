import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AddPhrase, Comment, GetPhrases } from "../interfaces/phrases.interfaces";
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
            `${ environments.API_GATEWAY }/quote?PageSize=${ pageSize }&PageIndex=${ pageIndex }`,
            { headers: this.headers }
        ).pipe(
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

    public addPhrase(phrase: AddPhrase): Observable<boolean>
    {
        return this.http.post<any>(
            `${ environments.API_GATEWAY }/quote`,
            {
                "author": phrase.author,
                "date": phrase.date.toISOString(),
                "text": phrase.text,
                "context": phrase.text
            },
            { headers: this.headers }
        ).pipe(
            map(response => !!response
            ),
            catchError(() => of(false))
        );
    }

    public getCommentsByQuote(id: number): Observable<Comment[]>
    {
        return this.http.get<any>(
            `${ environments.API_GATEWAY }/quote/${ id }`,
            { headers: this.headers }
        ).pipe(
            map(response => response.data.comments),
            catchError(() => of([]))
        );
    }

    public deleteComment(idQuote: number, idComment: number): Observable<boolean>
    {
        return this.http.delete<any>(
            `${ environments.API_GATEWAY }/quote/${ idQuote }/comment/${ idComment }`,
            { headers: this.headers }
        ).pipe(
            map(response => response.success),
            catchError(() => of(false))
        );
    }
}
