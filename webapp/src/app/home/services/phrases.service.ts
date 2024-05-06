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

    public getPhrases(
        pageSize: number = -1,
        pageIndex: number = 1,
        search: string = '',
        from: Date = new Date(0),
        to: Date = new Date(),
        authors: number[] = []
    ): Observable<GetPhrases | null>
    {
        const pageSizeQuery = `PageSize=${ pageSize }`;
        const pageIndexQuery = `PageIndex=${ pageIndex }`;
        const searchQuery = `Text=${ search }`;
        const fromQuery = `FromDate=${ from.toISOString() }`;
        const toQuery = `ToDate=${ to.toISOString() }`;
        const authorsQuery: string = authors.map(a => `&InvolvedUsers=${ a }`).join('');

        const URI = `${ environments.API_GATEWAY }/quote?${ pageSizeQuery }&${ pageIndexQuery }&${ searchQuery }&${ fromQuery }&${ toQuery }${ authorsQuery }`;

        return this.http.get<any>(
            URI,
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
                "context": phrase.context,
                "involvedUsers": phrase.users.map(user => user.id)
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

    public addComment(idQuote: number, message: string): Observable<boolean>
    {
        return this.http.post<any>(`${ environments.API_GATEWAY }/quote/${ idQuote }/comment`,
            { "text": message },
            { headers: this.headers }
        ).pipe(
            map(response => response.success),
            catchError(() => of(false))
        );
    }

    public updateComment(idQuote: number, idComment: number, message: string): Observable<boolean>
    {
        return this.http.put<any>(`${ environments.API_GATEWAY }/quote/${ idQuote }/comment/${ idComment }`,
        { "text": message },
        { headers: this.headers }
    ).pipe(
        map(response => response.success),
        catchError(() => of(false))
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
