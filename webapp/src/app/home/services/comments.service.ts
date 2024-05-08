import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Comment } from "../interfaces/comments.interface";
import { environments } from "../../../environments/environments";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentsService
{
    constructor(private http: HttpClient) {}

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ localStorage.getItem('token') }`
    });

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
        return this.http.post<any>(
            `${ environments.API_GATEWAY }/quote/${ idQuote }/comment`,
            { "text": message },
            { headers: this.headers }
        ).pipe(
            map(response => response.success),
            catchError(() => of(false))
        );
    }

    public updateComment(idQuote: number, idComment: number, message: string): Observable<boolean>
    {
        return this.http.put<any>(
            `${ environments.API_GATEWAY }/quote/${ idQuote }/comment/${ idComment }`,
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
